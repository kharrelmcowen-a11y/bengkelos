import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { createAdminClient } from "@/lib/supabase/admin";
import { formatIDR, formatDate } from "@/lib/format";
import { PageShell } from "@/components/page-shell";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { ModernCard } from "@/components/ui/modern-card";
import { GradientBackground } from "@/components/ui/gradient-bg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Trophy, TrendingUp, Users, Crown } from "lucide-react";

export default async function CustomersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const session = await getSession();
  if (!session) redirect("/login");

  const supabase = createAdminClient();
  let query = supabase
    .from("customers")
    .select("id, name, phone, total_visits, total_spent, loyalty_points, last_visit")
    .eq("shop_id", session.shopId)
    .order("total_spent", { ascending: false })
    .limit(30);

  if (q?.trim()) {
    query = query.or(`name.ilike.%${q.trim()}%,phone.ilike.%${q.trim()}%`);
  }

  const { data: customers } = await query;

  return (
    <PageShell>
      <GradientBackground />
      <PageHeader
        title="Pelanggan"
        description="Riwayat dan loyalitas pelanggan"
        backHref="/dashboard"
        backLabel="Dashboard"
      />

      <form method="GET" className="flex gap-2 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            name="q"
            defaultValue={q ?? ""}
            placeholder="Cari nama atau no. HP"
            className="flex-1 pl-10"
          />
        </div>
        <Button type="submit" className="glow-hover">
          <Search className="size-4" />
          Cari
        </Button>
      </form>

      <div className="space-y-4">
        {!customers || customers.length === 0 ? (
          <ModernCard className="p-8 text-center">
            <Users className="size-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              {q ? "Tidak ada pelanggan yang cocok." : "Belum ada pelanggan."}
            </p>
          </ModernCard>
        ) : (
          customers.map((customer, index) => {
            const isTopCustomer = index === 0;
            return (
              <Link key={customer.id} href={`/customers/${customer.id}`}>
                <ModernCard 
                  className="p-5"
                  gradient={isTopCustomer}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-lg">{customer.name}</span>
                        {customer.loyalty_points > 0 && (
                          <Badge 
                            variant="secondary" 
                            className="gap-1 bg-gradient-to-r from-primary/20 to-accent/20 border-primary/30"
                          >
                            {isTopCustomer && <Crown className="size-3" />}
                            <Trophy className="size-3" />
                            {customer.loyalty_points} poin
                          </Badge>
                        )}
                      </div>
                      {customer.phone && (
                        <p className="mt-2 text-sm text-muted-foreground">
                          {customer.phone}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg gradient-text">{formatIDR(customer.total_spent)}</p>
                      <p className="text-xs text-muted-foreground">
                        {customer.total_visits} kunjungan
                      </p>
                    </div>
                  </div>
                  {customer.last_visit && (
                    <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                      <TrendingUp className="size-4" />
                      Kunjungan terakhir: {formatDate(customer.last_visit)}
                    </div>
                  )}
                </ModernCard>
              </Link>
            );
          })
        )}
      </div>
    </PageShell>
  );
}