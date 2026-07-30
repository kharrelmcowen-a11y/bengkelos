import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { createAdminClient } from "@/lib/supabase/admin";
import { ItemForm } from "./ItemForm";
import { PaymentForm } from "./PaymentForm";
import { DeletePaymentButton } from "./DeletePaymentButton";
import { CompleteButton } from "./CompleteButton";
import { AttachmentForm } from "./AttachmentForm";
import { formatIDR } from "@/lib/format";
import { PageShell } from "@/components/page-shell";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { Receipt, MessageCircle } from "lucide-react";

export default async function TicketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getSession();
  if (!session) redirect("/login");

  const supabase = createAdminClient();

  const { data: ticket } = await supabase
    .from("service_tickets")
    .select(
      "id, status, notes, created_at, vehicle_id, customers(name, phone), vehicles(plate_number, brand, model), shops(name)",
    )
    .eq("id", id)
    .eq("shop_id", session.shopId)
    .maybeSingle();

  if (!ticket) notFound();

  const customer = Array.isArray(ticket.customers)
    ? ticket.customers[0]
    : ticket.customers;
  const vehicle = Array.isArray(ticket.vehicles)
    ? ticket.vehicles[0]
    : ticket.vehicles;
  const shop = Array.isArray(ticket.shops) ? ticket.shops[0] : ticket.shops;

  const [{ data: items }, { data: payments }, { data: inventoryItems }, { data: attachments }] =
    await Promise.all([
      supabase
        .from("ticket_items")
        .select("id, description, quantity, unit_price")
        .eq("ticket_id", id)
        .order("created_at", { ascending: true }),
      supabase
        .from("payments")
        .select("id, amount, method, paid_at")
        .eq("ticket_id", id)
        .order("paid_at", { ascending: true }),
      supabase
        .from("inventory_items")
        .select("id, name, sku, unit, sell_price, stock_qty")
        .eq("shop_id", session.shopId)
        .order("name", { ascending: true }),
      supabase
        .from("ticket_attachments")
        .select("id, file_name, file_type, file_url, mime_type, created_at")
        .eq("ticket_id", id)
        .order("created_at", { ascending: true }),
    ]);

  const total = (items ?? []).reduce(
    (sum, item) => sum + item.quantity * item.unit_price,
    0,
  );
  const paid = (payments ?? []).reduce((sum, p) => sum + p.amount, 0);
  const balance = total - paid;
  const isCompleted = ticket.status === "completed";

  const waMessage = `Halo ${customer?.name ?? ""}, kendaraan ${vehicle?.plate_number ?? ""} sudah selesai diservis di ${shop?.name ?? "bengkel kami"}. Total: ${formatIDR(total)}. Terima kasih!`;
  const waLink = isCompleted
    ? buildWhatsAppLink(customer?.phone, waMessage)
    : null;

  return (
    <PageShell>
      <PageHeader
        backHref="/tickets"
        backLabel="Tiket aktif"
        title={customer?.name ?? ""}
        description={`${vehicle?.plate_number ?? ""} — ${vehicle?.brand ?? ""} ${vehicle?.model ?? ""}`}
        action={
          <Badge variant="secondary" className="capitalize">
            {ticket.status}
          </Badge>
        }
      />

      <Link
        href={`/vehicles/${ticket.vehicle_id}`}
        className="mb-6 inline-block text-sm text-muted-foreground hover:text-foreground"
      >
        Riwayat servis kendaraan ini
      </Link>

      {ticket.notes && (
        <Card className="mb-6 p-3">
          <p className="text-sm text-muted-foreground">{ticket.notes}</p>
        </Card>
      )}

      <section className="mt-6">
        <h2 className="text-sm font-medium text-muted-foreground">
          Item servis
        </h2>
        <Card className="mt-2">
          <CardContent className="divide-y divide-border p-0">
            {(items ?? []).length === 0 ? (
              <p className="p-3 text-sm text-muted-foreground">
                Belum ada item.
              </p>
            ) : (
              (items ?? []).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 text-sm"
                >
                  <span>
                    {item.description}{" "}
                    <span className="text-muted-foreground">
                      x{item.quantity}
                    </span>
                  </span>
                  <span>{formatIDR(item.quantity * item.unit_price)}</span>
                </div>
              ))
            )}
          </CardContent>
        </Card>
        {!isCompleted && (
          <ItemForm ticketId={ticket.id} inventoryItems={inventoryItems ?? []} />
        )}
      </section>

      <section className="mt-6">
        <h2 className="text-sm font-medium text-muted-foreground">
          Pembayaran
        </h2>
        <Card className="mt-2">
          <CardContent className="divide-y divide-border p-0">
            {(payments ?? []).length === 0 ? (
              <p className="p-3 text-sm text-muted-foreground">
                Belum ada pembayaran.
              </p>
            ) : (
              (payments ?? []).map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-3 text-sm"
                >
                  <span className="capitalize">{payment.method}</span>
                  <div className="flex items-center gap-2">
                    <span>{formatIDR(payment.amount)}</span>
                    {!isCompleted && (
                      <DeletePaymentButton paymentId={payment.id} />
                    )}
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
        {!isCompleted && <PaymentForm ticketId={ticket.id} />}
      </section>

      <AttachmentForm 
        ticketId={ticket.id} 
        existingAttachments={attachments ?? []} 
      />

      <Card className="mt-6 space-y-1 p-4 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Total</span>
          <span>{formatIDR(total)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Dibayar</span>
          <span>{formatIDR(paid)}</span>
        </div>
        <div className="flex justify-between font-medium">
          <span>Sisa</span>
          <span>{formatIDR(balance)}</span>
        </div>
      </Card>

      {!isCompleted && (
        <CompleteButton ticketId={ticket.id} balance={balance} />
      )}

      {isCompleted && (
        <div className="mt-6 space-y-2">
          <Link
            href={`/tickets/${ticket.id}/receipt`}
            className={buttonVariants({ className: "w-full" })}
          >
            <Receipt className="size-4" />
            Lihat struk
          </Link>
          {waLink ? (
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({
                variant: "outline",
                className: "w-full",
              })}
            >
              <MessageCircle className="size-4" />
              Kabari customer via WhatsApp
            </a>
          ) : (
            <p className="text-center text-sm text-muted-foreground">
              No. HP customer belum ada — tidak bisa kirim WA.
            </p>
          )}
        </div>
      )}
    </PageShell>
  );
}
