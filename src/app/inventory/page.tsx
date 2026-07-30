import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { createAdminClient } from "@/lib/supabase/admin";
import { PageShell } from "@/components/page-shell";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimatedButton } from "@/components/ui/animated-button";
import { ModernCard } from "@/components/ui/modern-card";
import { GradientBackground } from "@/components/ui/gradient-bg";
import { Input } from "@/components/ui/input";
import { PlusCircle, ScanLine, Package, AlertTriangle } from "lucide-react";

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
      <GradientBackground />
      <PageHeader
        title="Stok barang"
        backHref="/dashboard"
        backLabel="Dashboard"
        action={
          <AnimatedButton
            href="/inventory/new"
            size="sm"
            className="gradient-border"
          >
            <PlusCircle className="size-4" />
            Barang baru
          </AnimatedButton>
        }
      />

      <form method="GET" className="mb-6 flex gap-2">
        <div className="relative flex-1">
          <ScanLine className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            name="q"
            defaultValue={q ?? ""}
            placeholder="Scan barcode SKU atau cari nama barang"
            className="flex-1 pl-10"
          />
        </div>
        <Button type="submit" className="glow-hover">
          <ScanLine className="size-4" />
          Cari
        </Button>
      </form>

      <div className="space-y-4">
        {!items || items.length === 0 ? (
          <ModernCard className="p-8 text-center">
            <Package className="size-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              {q ? "Tidak ada barang yang cocok." : "Belum ada barang."}
            </p>
            <AnimatedButton 
              href="/inventory/new" 
              className="mt-4"
            >
              Tambah barang pertama
            </AnimatedButton>
          </ModernCard>
        ) : (
          items.map((item) => {
            const isLow = item.stock_qty <= item.reorder_point;
            return (
              <Link key={item.id} href={`/inventory/${item.id}`}>
                <ModernCard className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isLow ? 'bg-destructive/10' : 'bg-primary/10'}`}>
                        {isLow ? (
                          <AlertTriangle className="size-5 text-destructive" />
                        ) : (
                          <Package className="size-5 text-primary" />
                        )}
                      </div>
                      <div>
                        <span className="font-semibold text-lg">{item.name}</span>
                        <p className="text-sm text-muted-foreground mt-1">
                          {item.sku ? `${item.sku} — ` : ""}
                          {item.stock_qty} {item.unit} tersisa
                        </p>
                      </div>
                    </div>
                    {isLow && (
                      <Badge variant="destructive" className="ml-2">
                        Stok rendah
                      </Badge>
                    )}
                  </div>
                </ModernCard>
              </Link>
            );
          })
        )}
      </div>
    </PageShell>
  );
}
