import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { createAdminClient } from "@/lib/supabase/admin";
import { formatIDR } from "@/lib/format";
import { PageShell } from "@/components/page-shell";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { rows } from "@/lib/query";

type TicketItemRow = {
  quantity: number;
  unit_price: number;
  inventory_item_id: string | null;
  inventory_items: { cost_price: number } | { cost_price: number }[] | null;
};

export default async function FinancePage() {
  const session = await getSession();
  if (!session) redirect("/login");
  // Owner-only, as it was before the PIN came out. The till stands where
  // customers and mechanics can see it; takings and margins do not belong there.
  if (session.role !== "owner") redirect("/dashboard");

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const monthLabel = new Intl.DateTimeFormat("id-ID", {
    month: "long",
    year: "numeric",
  }).format(now);

  const supabase = createAdminClient();

  const [ticketsResult, expensesResult, paymentsResult] = await Promise.all([
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
    // Cash actually received this month, which lags the invoiced revenue above
    // whenever a ticket is paid off in instalments.
    supabase
      .from("payments")
      .select("amount")
      .eq("shop_id", session.shopId)
      .gte("paid_at", startOfMonth.toISOString())
      .lt("paid_at", startOfNextMonth.toISOString()),
  ]);

  const tickets = rows<{ id: string; completed_at: string; ticket_items: TicketItemRow[] }>(
    ticketsResult,
    "service_tickets:month",
    session.shopId,
  );
  const expenses = rows<{ amount: number }>(expensesResult, "expenses:month", session.shopId);
  const payments = rows<{ amount: number }>(paymentsResult, "payments:month", session.shopId);

  let revenue = 0;
  let cogs = 0;

  for (const ticket of tickets) {
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

  const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const cashIn = payments.reduce((sum, p) => sum + Number(p.amount), 0);
  const netCash = cashIn - totalExpenses;
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

      <Card className="mt-6 space-y-1 p-4 text-sm">
        <div className="mb-1 font-medium">Arus kas</div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Uang masuk (pembayaran)</span>
          <span>{formatIDR(cashIn)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Uang keluar (pengeluaran)</span>
          <span>-{formatIDR(totalExpenses)}</span>
        </div>
        <div className="flex justify-between border-t border-border pt-1 text-base font-semibold">
          <span>Kas bersih</span>
          <span className={netCash < 0 ? "text-destructive" : ""}>{formatIDR(netCash)}</span>
        </div>
        <p className="pt-1 text-xs text-muted-foreground">
          Pendapatan di atas dihitung saat tiket selesai; kas dihitung saat uang diterima.
        </p>
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
