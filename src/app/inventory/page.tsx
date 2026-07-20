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

export default async function InventoryPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const supabase = createAdminClient();
  const { data: items } = await supabase
    .from("inventory_items")
    .select("id, name, sku, unit, stock_qty, reorder_point, sell_price")
    .eq("shop_id", session.shopId)
    .order("name", { ascending: true });

  return (
    <PageShell>
      <PageHeader
        title="Stok barang"
        backHref="/dashboard"
        backLabel="Dashboard"
        action={
          <Link
            href="/inventory/new"
            className={buttonVariants({ size: "sm" })}
          >
            <PlusCircle className="size-4" />
            Barang baru
          </Link>
        }
      />

      <div className="space-y-3">
        {!items || items.length === 0 ? (
          <p className="text-sm text-muted-foreground">Belum ada barang.</p>
        ) : (
          items.map((item) => {
            const isLow = item.stock_qty <= item.reorder_point;
            return (
              <Link key={item.id} href={`/inventory/${item.id}`}>
                <Card className="p-4 transition-colors hover:bg-muted/50">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{item.name}</span>
                    {isLow && (
                      <Badge variant="destructive">Stok rendah</Badge>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.sku ? `${item.sku} — ` : ""}
                    {item.stock_qty} {item.unit} tersisa
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
