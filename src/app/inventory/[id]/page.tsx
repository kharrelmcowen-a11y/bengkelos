import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { createAdminClient } from "@/lib/supabase/admin";
import { AdjustStockForm } from "./AdjustStockForm";
import { formatIDR } from "@/lib/format";
import { PageShell } from "@/components/page-shell";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { rows } from "@/lib/query";

export default async function InventoryItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getSession();
  if (!session) redirect("/login");

  const supabase = createAdminClient();

  const { data: item } = await supabase
    .from("inventory_items")
    .select(
      "id, name, sku, unit, cost_price, sell_price, stock_qty, reorder_point",
    )
    .eq("id", id)
    .eq("shop_id", session.shopId)
    .maybeSingle();

  if (!item) notFound();

  const movementsResult = await supabase
    .from("stock_movements")
    .select("change_qty, reason, created_at")
    .eq("inventory_item_id", id)
    .order("created_at", { ascending: false })
    .limit(20);

  const movements = rows(movementsResult, "stock_movements:item", session.shopId);

  const isLow = item.stock_qty <= item.reorder_point;

  return (
    <PageShell>
      <PageHeader
        backHref="/inventory"
        backLabel="Stok barang"
        title={item.name}
        description={`${item.sku ? `${item.sku} — ` : ""}${item.stock_qty} ${item.unit} tersisa`}
        action={isLow && <Badge variant="destructive">Stok rendah</Badge>}
      />

      <div className="grid grid-cols-2 gap-3 text-sm">
        <Card className="p-3">
          <p className="text-muted-foreground">Harga modal</p>
          <p>{formatIDR(item.cost_price)}</p>
        </Card>
        <Card className="p-3">
          <p className="text-muted-foreground">Harga jual</p>
          <p>{formatIDR(item.sell_price)}</p>
        </Card>
        <Card className="p-3">
          <p className="text-muted-foreground">Stok saat ini</p>
          <p>
            {item.stock_qty} {item.unit}
          </p>
        </Card>
        <Card className="p-3">
          <p className="text-muted-foreground">Titik reorder</p>
          <p>
            {item.reorder_point} {item.unit}
          </p>
        </Card>
      </div>

      <section className="mt-6">
        <h2 className="text-sm font-medium text-muted-foreground">
          Sesuaikan stok
        </h2>
        <AdjustStockForm itemId={item.id} />
      </section>

      <section className="mt-6">
        <h2 className="text-sm font-medium text-muted-foreground">
          Riwayat pergerakan
        </h2>
        <Card className="mt-2">
          <CardContent className="divide-y divide-border p-0">
            {!movements || movements.length === 0 ? (
              <p className="p-3 text-sm text-muted-foreground">
                Belum ada pergerakan stok.
              </p>
            ) : (
              movements.map((m, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 text-sm"
                >
                  <span className="capitalize text-muted-foreground">
                    {m.reason.replace("_", " ")}
                  </span>
                  <span className={m.change_qty < 0 ? "text-destructive" : ""}>
                    {m.change_qty > 0 ? "+" : ""}
                    {m.change_qty} {item.unit}
                  </span>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </section>
    </PageShell>
  );
}
