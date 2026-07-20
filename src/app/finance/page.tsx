import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { createAdminClient } from "@/lib/supabase/admin";

function formatIDR(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

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
    <main className="min-h-screen bg-neutral-950 p-6 text-white">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-lg font-semibold">Laporan keuangan</h1>
        <p className="text-sm text-neutral-400 capitalize">{monthLabel}</p>

        <div className="mt-6 space-y-1 rounded-lg bg-neutral-900 p-4 text-sm">
          <div className="flex justify-between">
            <span className="text-neutral-400">Pendapatan</span>
            <span>{formatIDR(revenue)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">Modal barang (COGS)</span>
            <span>-{formatIDR(cogs)}</span>
          </div>
          <div className="flex justify-between border-t border-neutral-800 pt-1 font-medium">
            <span>Laba kotor</span>
            <span>{formatIDR(grossProfit)}</span>
          </div>
          <div className="mt-2 flex justify-between">
            <span className="text-neutral-400">Pengeluaran</span>
            <span>-{formatIDR(totalExpenses)}</span>
          </div>
          <div className="flex justify-between border-t border-neutral-800 pt-1 text-base font-semibold">
            <span>Laba bersih</span>
            <span className={netProfit < 0 ? "text-red-400" : ""}>
              {formatIDR(netProfit)}
            </span>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <Link
            href="/expenses"
            className="text-sm text-neutral-400 hover:text-white"
          >
            Kelola pengeluaran
          </Link>
          <Link
            href="/dashboard"
            className="text-sm text-neutral-400 hover:text-white"
          >
            &larr; Kembali ke dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
