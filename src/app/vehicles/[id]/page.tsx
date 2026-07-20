import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { createAdminClient } from "@/lib/supabase/admin";
import { formatDate, formatIDR } from "@/lib/format";
import { PageShell } from "@/components/page-shell";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type TicketItemRow = { quantity: number; unit_price: number };

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getSession();
  if (!session) redirect("/login");

  const supabase = createAdminClient();

  const { data: vehicle } = await supabase
    .from("vehicles")
    .select("id, plate_number, brand, model, year, notes, customers(name, phone)")
    .eq("id", id)
    .eq("shop_id", session.shopId)
    .maybeSingle();

  if (!vehicle) notFound();

  const customer = Array.isArray(vehicle.customers)
    ? vehicle.customers[0]
    : vehicle.customers;

  const { data: tickets } = await supabase
    .from("service_tickets")
    .select("id, status, created_at, completed_at, ticket_items(quantity, unit_price)")
    .eq("vehicle_id", id)
    .eq("shop_id", session.shopId)
    .order("created_at", { ascending: false });

  return (
    <PageShell>
      <PageHeader
        title={vehicle.plate_number}
        description={`${vehicle.brand ?? ""} ${vehicle.model ?? ""}${vehicle.year ? ` (${vehicle.year})` : ""}`}
        backHref="/vehicles"
        backLabel="Cari kendaraan"
      />

      <Card className="p-4 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Pemilik</span>
          <span>{customer?.name ?? "-"}</span>
        </div>
        {customer?.phone && (
          <div className="mt-1 flex justify-between">
            <span className="text-muted-foreground">No. HP</span>
            <span>{customer.phone}</span>
          </div>
        )}
        {vehicle.notes && (
          <p className="mt-2 text-muted-foreground">{vehicle.notes}</p>
        )}
      </Card>

      <section className="mt-6">
        <h2 className="text-sm font-medium text-muted-foreground">
          Riwayat servis
        </h2>
        <div className="mt-2 space-y-3">
          {!tickets || tickets.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Belum ada riwayat servis untuk kendaraan ini.
            </p>
          ) : (
            tickets.map((ticket) => {
              const items = (ticket.ticket_items ?? []) as TicketItemRow[];
              const total = items.reduce(
                (sum, item) => sum + item.quantity * item.unit_price,
                0,
              );
              return (
                <Link key={ticket.id} href={`/tickets/${ticket.id}`}>
                  <Card className="p-4 transition-colors hover:bg-muted/50">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {formatDate(ticket.created_at)}
                      </span>
                      <Badge variant="secondary" className="capitalize">
                        {ticket.status}
                      </Badge>
                    </div>
                    <p className="mt-1 font-medium">{formatIDR(total)}</p>
                  </Card>
                </Link>
              );
            })
          )}
        </div>
      </section>
    </PageShell>
  );
}
