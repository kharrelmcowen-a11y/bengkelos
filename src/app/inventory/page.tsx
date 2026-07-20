import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { createAdminClient } from "@/lib/supabase/admin";
import { PageShell } from "@/components/page-shell";
import { PageHeader } from "@/components/page-header";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, ScanLine } from "lucide-react";

export default async function InventoryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const session = await getSession();
  if (!session) redirect("/login");

  const supabase = createAdminClient();
  let query = supabase
    .from("inventory_items")
    .select("id, name, sku, unit, stock_qty, reorder_point, sell_price")
    .eq("shop_id", session.shopId)
    .order("name", { ascending: true });

  if (q?.trim()) {
    query = query.or(`name.ilike.%${q.trim()}%,sku.ilike.%${q.trim()}%`);
  }

  const { data: items } = await query;

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

      <form method="GET" className="mb-4 flex gap-2">
        <Input
          name="q"
          defaultValue={q ?? ""}
          placeholder="Scan barcode SKU atau cari nama barang"
          className="flex-1"
        />
        <Button type="submit">
          <ScanLine className="size-4" />
          Cari
        </Button>
      </form>

      <div className="space-y-3">
        {!items || items.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            {q ? "Tidak ada barang yang cocok." : "Belum ada barang."}
          </p>
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
