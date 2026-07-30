import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { createAdminClient } from "@/lib/supabase/admin";
import { formatIDR, formatDate } from "@/lib/format";
import { PageShell } from "@/components/page-shell";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Trophy, TrendingUp } from "lucide-react";

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
      <PageHeader
        title="Pelanggan"
        description="Riwayat dan loyalitas pelanggan"
        backHref="/dashboard"
        backLabel="Dashboard"
      />

      <form method="GET" className="flex gap-2">
        <Input
          name="q"
          defaultValue={q ?? ""}
          placeholder="Cari nama atau no. HP"
          className="flex-1"
        />
        <Button type="submit">
          <Search className="size-4" />
          Cari
        </Button>
      </form>

      <div className="mt-6 space-y-3">
        {!customers || customers.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            {q ? "Tidak ada pelanggan yang cocok." : "Belum ada pelanggan."}
          </p>
        ) : (
          customers.map((customer) => (
            <Link key={customer.id} href={`/customers/${customer.id}`}>
              <Card className="p-4 transition-colors hover:bg-muted/50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{customer.name}</span>
                      {customer.loyalty_points > 0 && (
                        <Badge variant="secondary" className="gap-1">
                          <Trophy className="size-3" />
                          {customer.loyalty_points} poin
                        </Badge>
                      )}
                    </div>
                    {customer.phone && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {customer.phone}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatIDR(customer.total_spent)}</p>
                    <p className="text-xs text-muted-foreground">
                      {customer.total_visits} kunjungan
                    </p>
                  </div>
                </div>
                {customer.last_visit && (
                  <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                    <TrendingUp className="size-3" />
                    Kunjungan terakhir: {formatDate(customer.last_visit)}
                  </div>
                )}
              </Card>
            </Link>
          ))
        )}
      </div>
    </PageShell>
  );
}