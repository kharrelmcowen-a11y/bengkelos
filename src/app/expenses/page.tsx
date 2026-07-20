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

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(
    new Date(iso),
  );
}

export default async function ExpensesPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role !== "owner") redirect("/dashboard");

  const supabase = createAdminClient();
  const { data: expenses } = await supabase
    .from("expenses")
    .select("id, category, description, amount, spent_at")
    .eq("shop_id", session.shopId)
    .order("spent_at", { ascending: false })
    .limit(50);

  return (
    <main className="min-h-screen bg-neutral-950 p-6 text-white">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">Pengeluaran</h1>
          <Link
            href="/expenses/new"
            className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-neutral-950"
          >
            + Catat pengeluaran
          </Link>
        </div>

        <div className="mt-6 space-y-3">
          {!expenses || expenses.length === 0 ? (
            <p className="text-sm text-neutral-400">
              Belum ada pengeluaran.
            </p>
          ) : (
            expenses.map((expense) => (
              <div
                key={expense.id}
                className="rounded-lg border border-neutral-800 p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium capitalize">
                    {expense.category}
                  </span>
                  <span>{formatIDR(expense.amount)}</span>
                </div>
                <p className="mt-1 text-sm text-neutral-400">
                  {formatDate(expense.spent_at)}
                  {expense.description ? ` — ${expense.description}` : ""}
                </p>
              </div>
            ))
          )}
        </div>

        <div className="mt-6 flex gap-4">
          <Link
            href="/finance"
            className="text-sm text-neutral-400 hover:text-white"
          >
            Lihat laporan keuangan
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
