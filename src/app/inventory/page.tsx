import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { createAdminClient } from "@/lib/supabase/admin";

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
    <main className="min-h-screen bg-neutral-950 p-6 text-white">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">Stok barang</h1>
          <Link
            href="/inventory/new"
            className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-neutral-950"
          >
            + Barang baru
          </Link>
        </div>

        <div className="mt-6 space-y-3">
          {!items || items.length === 0 ? (
            <p className="text-sm text-neutral-400">Belum ada barang.</p>
          ) : (
            items.map((item) => {
              const isLow = item.stock_qty <= item.reorder_point;
              return (
                <Link
                  key={item.id}
                  href={`/inventory/${item.id}`}
                  className="block rounded-lg border border-neutral-800 p-4 hover:bg-neutral-900"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{item.name}</span>
                    {isLow && (
                      <span className="rounded-full bg-red-900 px-2 py-0.5 text-xs text-red-300">
                        Stok rendah
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-neutral-400">
                    {item.sku ? `${item.sku} — ` : ""}
                    {item.stock_qty} {item.unit} tersisa
                  </p>
                </Link>
              );
            })
          )}
        </div>

        <Link
          href="/dashboard"
          className="mt-6 inline-block text-sm text-neutral-400 hover:text-white"
        >
          &larr; Kembali ke dashboard
        </Link>
      </div>
    </main>
  );
}
