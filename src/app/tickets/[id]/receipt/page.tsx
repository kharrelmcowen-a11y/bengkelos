import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { createAdminClient } from "@/lib/supabase/admin";
import { PrintButton } from "./PrintButton";
import { formatIDR, formatDateTime } from "@/lib/format";

export default async function ReceiptPage({
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
      "id, status, notes, completed_at, customers(name, phone), vehicles(plate_number, brand, model), staff(name)",
    )
    .eq("id", id)
    .eq("shop_id", session.shopId)
    .maybeSingle();

  if (!ticket || ticket.status !== "completed") notFound();

  const { data: shop } = await supabase
    .from("shops")
    .select("name, address, phone")
    .eq("id", session.shopId)
    .single();

  const customer = Array.isArray(ticket.customers)
    ? ticket.customers[0]
    : ticket.customers;
  const vehicle = Array.isArray(ticket.vehicles)
    ? ticket.vehicles[0]
    : ticket.vehicles;
  const staff = Array.isArray(ticket.staff) ? ticket.staff[0] : ticket.staff;

  const [{ data: items }, { data: payments }] = await Promise.all([
    supabase
      .from("ticket_items")
      .select("description, quantity, unit_price")
      .eq("ticket_id", id)
      .order("created_at", { ascending: true }),
    supabase
      .from("payments")
      .select("amount, method, paid_at")
      .eq("ticket_id", id)
      .order("paid_at", { ascending: true }),
  ]);

  const total = (items ?? []).reduce(
    (sum, item) => sum + item.quantity * item.unit_price,
    0,
  );
  const paid = (payments ?? []).reduce((sum, p) => sum + p.amount, 0);

  return (
    <main className="min-h-screen p-6 print:p-0">
      <div className="mx-auto max-w-sm font-mono text-sm">
        <Link
          href={`/tickets/${ticket.id}`}
          className="mb-4 block text-muted-foreground hover:text-foreground print:hidden"
        >
          &larr; Kembali ke tiket
        </Link>

        <div className="rounded-xl border border-border bg-card p-5 text-card-foreground ring-1 ring-foreground/10 print:border-0 print:bg-white print:p-0 print:text-black print:ring-0">
          <div className="text-center">
            <p className="text-base font-semibold">{shop?.name}</p>
            {shop?.address && (
              <p className="text-muted-foreground print:text-black">
                {shop.address}
              </p>
            )}
            {shop?.phone && (
              <p className="text-muted-foreground print:text-black">
                {shop.phone}
              </p>
            )}
          </div>

          <div className="my-3 border-t border-dashed border-border print:border-black" />

          <div className="space-y-0.5 text-muted-foreground print:text-black">
            <div className="flex justify-between">
              <span>No. Tiket</span>
              <span>{ticket.id.slice(0, 8).toUpperCase()}</span>
            </div>
            <div className="flex justify-between">
              <span>Tanggal</span>
              <span>
                {ticket.completed_at
                  ? formatDateTime(ticket.completed_at)
                  : "-"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Kasir</span>
              <span>{staff?.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Customer</span>
              <span>{customer?.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Kendaraan</span>
              <span>
                {vehicle?.plate_number} {vehicle?.brand} {vehicle?.model}
              </span>
            </div>
          </div>

          <div className="my-3 border-t border-dashed border-border print:border-black" />

          <div className="space-y-1">
            {(items ?? []).map((item, i) => (
              <div key={i} className="flex justify-between gap-2">
                <span className="flex-1">
                  {item.description}{" "}
                  <span className="text-muted-foreground print:text-black">
                    x{item.quantity}
                  </span>
                </span>
                <span>{formatIDR(item.quantity * item.unit_price)}</span>
              </div>
            ))}
          </div>

          <div className="my-3 border-t border-dashed border-border print:border-black" />

          <div className="space-y-0.5">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>{formatIDR(total)}</span>
            </div>
            {(payments ?? []).map((payment, i) => (
              <div
                key={i}
                className="flex justify-between text-muted-foreground capitalize print:text-black"
              >
                <span>Bayar ({payment.method})</span>
                <span>{formatIDR(payment.amount)}</span>
              </div>
            ))}
            <div className="flex justify-between text-muted-foreground print:text-black">
              <span>Kembali</span>
              <span>{formatIDR(Math.max(paid - total, 0))}</span>
            </div>
          </div>

          <div className="my-3 border-t border-dashed border-border print:border-black" />

          <p className="text-center text-muted-foreground print:text-black">
            Terima kasih telah servis di sini
          </p>
        </div>

        <div className="mt-4">
          <PrintButton />
        </div>
      </div>
    </main>
  );
}
