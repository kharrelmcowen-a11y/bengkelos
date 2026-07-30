import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { createAdminClient } from "@/lib/supabase/admin";
import { formatIDR, formatDateTime, formatDate } from "@/lib/format";
import { PageShell } from "@/components/page-shell";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Calendar, Phone, TrendingUp } from "lucide-react";

export default async function CustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getSession();
  if (!session) redirect("/login");

  const supabase = createAdminClient();

  const { data: customer } = await supabase
    .from("customers")
    .select("id, name, phone, total_visits, total_spent, loyalty_points, first_visit, last_visit")
    .eq("id", id)
    .eq("shop_id", session.shopId)
    .maybeSingle();

  if (!customer) notFound();

  const { data: tickets } = await supabase
    .from("service_tickets")
    .select("id, status, created_at, completed_at, vehicles(plate_number, brand, model)")
    .eq("customer_id", id)
    .eq("shop_id", session.shopId)
    .order("created_at", { ascending: false })
    .limit(20);

  return (
    <PageShell>
      <PageHeader
        title={customer.name}
        backHref="/customers"
        backLabel="Pelanggan"
      />

      {/* Customer Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-3">
          <div className="flex items-center gap-2">
            <Trophy className="size-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Poin loyalitas</p>
              <p className="text-lg font-semibold">{customer.loyalty_points}</p>
            </div>
          </div>
        </Card>
        <Card className="p-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="size-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Total belanja</p>
              <p className="text-lg font-semibold">{formatIDR(customer.total_spent)}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="mt-4 p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Phone className="size-4 text-muted-foreground" />
          <span className="text-sm">{customer.phone || "No. HP tidak tersedia"}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="size-4 text-muted-foreground" />
          <span className="text-sm">
            {customer.total_visits} kunjungan sejak{" "}
            {customer.first_visit ? formatDate(customer.first_visit) : "-"}
          </span>
        </div>
        {customer.last_visit && (
          <div className="flex items-center gap-2">
            <TrendingUp className="size-4 text-muted-foreground" />
            <span className="text-sm">
              Kunjungan terakhir: {formatDate(customer.last_visit)}
            </span>
          </div>
        )}
      </Card>

      {/* Service History */}
      <div className="mt-6">
        <h2 className="text-sm font-medium text-muted-foreground mb-3">
          Riwayat Servis
        </h2>
        <div className="space-y-3">
          {!tickets || tickets.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Belum ada riwayat servis.
            </p>
          ) : (
            tickets.map((ticket) => {
              const vehicle = Array.isArray(ticket.vehicles)
                ? ticket.vehicles[0]
                : ticket.vehicles;

              return (
                <Link key={ticket.id} href={`/tickets/${ticket.id}`}>
                  <Card className="p-3 transition-colors hover:bg-muted/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">{vehicle?.plate_number}</span>
                        <p className="text-sm text-muted-foreground">
                          {vehicle?.brand} {vehicle?.model}
                        </p>
                      </div>
                      <Badge variant="secondary" className="capitalize">
                        {ticket.status}
                      </Badge>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {formatDateTime(ticket.created_at)}
                    </p>
                  </Card>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </PageShell>
  );
}