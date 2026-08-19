import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { createAdminClient } from "@/lib/supabase/admin";
import { PageShell } from "@/components/page-shell";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { AnimatedButton } from "@/components/ui/animated-button";
import { ModernCard } from "@/components/ui/modern-card";
import { GradientBackground } from "@/components/ui/gradient-bg";
import { PlusCircle, Wrench, Clock } from "lucide-react";

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
      <GradientBackground />
      <PageHeader
        title="Tiket servis aktif"
        backHref="/dashboard"
        backLabel="Dashboard"
        action={
          <AnimatedButton
            href="/tickets/new"
            size="sm"
            className="gradient-border"
          >
            <PlusCircle className="size-4" />
            Tiket baru
          </AnimatedButton>
        }
      />

      <div className="space-y-4">
        {!tickets || tickets.length === 0 ? (
          <ModernCard className="p-8 text-center">
            <Wrench className="size-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Belum ada tiket aktif.</p>
            <AnimatedButton 
              href="/tickets/new" 
              className="mt-4"
            >
              Buat tiket pertama
            </AnimatedButton>
          </ModernCard>
        ) : (
          tickets.map((ticket) => {
            const customer = Array.isArray(ticket.customers)
              ? ticket.customers[0]
              : ticket.customers;
            const vehicle = Array.isArray(ticket.vehicles)
              ? ticket.vehicles[0]
              : ticket.vehicles;

            const statusIcon = ticket.status === "open" ? (
              <Clock className="size-4 text-yellow-500" />
            ) : (
              <Wrench className="size-4 text-blue-500" />
            );

            return (
              <Link key={ticket.id} href={`/tickets/${ticket.id}`}>
                <ModernCard className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        {statusIcon}
                      </div>
                      <div>
                        <span className="font-semibold text-lg">{customer?.name}</span>
                        <p className="text-sm text-muted-foreground mt-1">
                          {vehicle?.plate_number} — {vehicle?.brand} {vehicle?.model}
                        </p>
                      </div>
                    </div>
                    <Badge 
                      variant={ticket.status === "open" ? "secondary" : "default"}
                      className="capitalize"
                    >
                      {ticket.status === "open" ? "Menunggu" : "Sedang dikerjakan"}
                    </Badge>
                  </div>
                </ModernCard>
              </Link>
            );
          })
        )}
      </div>
    </PageShell>
  );
}
