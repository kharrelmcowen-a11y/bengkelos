import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { createAdminClient } from "@/lib/supabase/admin";
import { formatIDR, formatDate } from "@/lib/format";
import { PageShell } from "@/components/page-shell";
import { PageHeader } from "@/components/page-header";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

export default async function ExpensesPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const supabase = createAdminClient();
  const { data: expenses } = await supabase
    .from("expenses")
    .select("id, category, description, amount, spent_at")
    .eq("shop_id", session.shopId)
    .order("spent_at", { ascending: false })
    .limit(50);

  return (
    <PageShell>
      <PageHeader
        title="Pengeluaran"
        backHref="/dashboard"
        backLabel="Dashboard"
        action={
          <Link
            href="/expenses/new"
            className={buttonVariants({ size: "sm" })}
          >
            <PlusCircle className="size-4" />
            Catat pengeluaran
          </Link>
        }
      />

      <div className="space-y-3">
        {!expenses || expenses.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Belum ada pengeluaran.
          </p>
        ) : (
          expenses.map((expense) => (
            <Card key={expense.id} className="p-4">
              <div className="flex items-center justify-between">
                <span className="font-medium capitalize">
                  {expense.category}
                </span>
                <span>{formatIDR(expense.amount)}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {formatDate(expense.spent_at)}
                {expense.description ? ` — ${expense.description}` : ""}
              </p>
            </Card>
          ))
        )}
      </div>

      <div className="mt-6">
        <Link
          href="/finance"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Lihat laporan keuangan
        </Link>
      </div>
    </PageShell>
  );
}
