import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { createAdminClient } from "@/lib/supabase/admin";
import { formatIDR } from "@/lib/format";
import { PageShell } from "@/components/page-shell";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";

type TicketItemRow = {
  quantity: number;
  unit_price: number;
  inventory_item_id: string | null;
  inventory_items: { cost_price: number } | { cost_price: number }[] | null;
};

export default async function FinancePage() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role !== "owner") redirect("/dashboard");

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const monthLabel = new Intl.DateTimeFormat("id-ID", {
    month: "long",
    year: "numeric",
  }).format(now);

  const supabase = createAdminClient();

  const [{ data: tickets }, { data: expenses }] = await Promise.all([
    supabase
      .from("service_tickets")
      .select(
        "id, completed_at, ticket_items(quantity, unit_price, inventory_item_id, inventory_items(cost_price))",
      )
      .eq("shop_id", session.shopId)
      .eq("status", "completed")
      .gte("completed_at", startOfMonth.toISOString())
      .lt("completed_at", startOfNextMonth.toISOString()),
    supabase
      .from("expenses")
      .select("amount")
      .eq("shop_id", session.shopId)
      .gte("spent_at", startOfMonth.toISOString().slice(0, 10))
      .lt("spent_at", startOfNextMonth.toISOString().slice(0, 10)),
  ]);

  let revenue = 0;
  let cogs = 0;

  for (const ticket of tickets ?? []) {
    const items = (ticket.ticket_items ?? []) as TicketItemRow[];
    for (const item of items) {
      revenue += item.quantity * item.unit_price;
      if (item.inventory_item_id) {
        const inventoryItem = Array.isArray(item.inventory_items)
          ? item.inventory_items[0]
          : item.inventory_items;
        cogs += item.quantity * (inventoryItem?.cost_price ?? 0);
      }
    }
  }

  const totalExpenses = (expenses ?? []).reduce(
    (sum, e) => sum + e.amount,
    0,
  );
  const grossProfit = revenue - cogs;
  const netProfit = grossProfit - totalExpenses;

  return (
    <PageShell>
      <PageHeader
        title="Laporan keuangan"
        description={monthLabel}
        backHref="/dashboard"
        backLabel="Dashboard"
      />

      <Card className="space-y-1 p-4 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Pendapatan</span>
          <span>{formatIDR(revenue)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Modal barang (COGS)</span>
          <span>-{formatIDR(cogs)}</span>
        </div>
        <div className="flex justify-between border-t border-border pt-1 font-medium">
          <span>Laba kotor</span>
          <span>{formatIDR(grossProfit)}</span>
        </div>
        <div className="mt-2 flex justify-between">
          <span className="text-muted-foreground">Pengeluaran</span>
          <span>-{formatIDR(totalExpenses)}</span>
        </div>
        <div className="flex justify-between border-t border-border pt-1 text-base font-semibold">
          <span>Laba bersih</span>
          <span className={netProfit < 0 ? "text-destructive" : ""}>
            {formatIDR(netProfit)}
          </span>
        </div>
      </Card>

      <div className="mt-6">
        <Link
          href="/expenses"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Kelola pengeluaran
        </Link>
      </div>
    </PageShell>
  );
}
