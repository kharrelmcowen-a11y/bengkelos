import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { createAdminClient } from "@/lib/supabase/admin";
import { PageShell } from "@/components/page-shell";
import { PageHeader } from "@/components/page-header";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

export default async function TicketsPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const supabase = createAdminClient();
  const { data: tickets } = await supabase
    .from("service_tickets")
    .select(
      "id, status, created_at, customers(name), vehicles(plate_number, brand, model)",
    )
    .eq("shop_id", session.shopId)
    .in("status", ["open", "in_progress"])
    .order("created_at", { ascending: false });

  return (
    <PageShell>
      <PageHeader
        title="Tiket servis aktif"
        backHref="/dashboard"
        backLabel="Dashboard"
        action={
          <Link
            href="/tickets/new"
            className={buttonVariants({ size: "sm" })}
          >
            <PlusCircle className="size-4" />
            Tiket baru
          </Link>
        }
      />

      <div className="space-y-3">
        {!tickets || tickets.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Belum ada tiket aktif.
          </p>
        ) : (
          tickets.map((ticket) => {
            const customer = Array.isArray(ticket.customers)
              ? ticket.customers[0]
              : ticket.customers;
            const vehicle = Array.isArray(ticket.vehicles)
              ? ticket.vehicles[0]
              : ticket.vehicles;

            return (
              <Link key={ticket.id} href={`/tickets/${ticket.id}`}>
                <Card className="p-4 transition-colors hover:bg-muted/50">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{customer?.name}</span>
                    <Badge variant="secondary" className="capitalize">
                      {ticket.status}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {vehicle?.plate_number} — {vehicle?.brand}{" "}
                    {vehicle?.model}
                  </p>
                </Card>
              </Link>
            );
          })
        )}
      </div>
    </PageShell>
  );
}
