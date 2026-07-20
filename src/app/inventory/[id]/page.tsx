import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { createAdminClient } from "@/lib/supabase/admin";
import { AdjustStockForm } from "./AdjustStockForm";

function formatIDR(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

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

  const { data: movements } = await supabase
    .from("stock_movements")
    .select("change_qty, reason, created_at")
    .eq("inventory_item_id", id)
    .order("created_at", { ascending: false })
    .limit(20);

  const isLow = item.stock_qty <= item.reorder_point;

  return (
    <main className="min-h-screen bg-neutral-950 p-6 text-white">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/inventory"
          className="text-sm text-neutral-400 hover:text-white"
        >
          &larr; Stok barang
        </Link>

        <div className="mt-3 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold">{item.name}</h1>
            <p className="text-sm text-neutral-400">
              {item.sku ? `${item.sku} — ` : ""}
              {item.stock_qty} {item.unit} tersisa
            </p>
          </div>
          {isLow && (
            <span className="rounded-full bg-red-900 px-3 py-1 text-xs text-red-300">
              Stok rendah
            </span>
          )}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg bg-neutral-900 p-3">
            <p className="text-neutral-400">Harga modal</p>
            <p>{formatIDR(item.cost_price)}</p>
          </div>
          <div className="rounded-lg bg-neutral-900 p-3">
            <p className="text-neutral-400">Harga jual</p>
            <p>{formatIDR(item.sell_price)}</p>
          </div>
          <div className="rounded-lg bg-neutral-900 p-3">
            <p className="text-neutral-400">Stok saat ini</p>
            <p>
              {item.stock_qty} {item.unit}
            </p>
          </div>
          <div className="rounded-lg bg-neutral-900 p-3">
            <p className="text-neutral-400">Titik reorder</p>
            <p>
              {item.reorder_point} {item.unit}
            </p>
          </div>
        </div>

        <section className="mt-6">
          <h2 className="text-sm font-medium text-neutral-400">
            Sesuaikan stok
          </h2>
          <AdjustStockForm itemId={item.id} />
        </section>

        <section className="mt-6">
          <h2 className="text-sm font-medium text-neutral-400">
            Riwayat pergerakan
          </h2>
          <div className="mt-2 divide-y divide-neutral-800 rounded-lg border border-neutral-800">
            {!movements || movements.length === 0 ? (
              <p className="p-3 text-sm text-neutral-500">
                Belum ada pergerakan stok.
              </p>
            ) : (
              movements.map((m, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 text-sm"
                >
                  <span className="capitalize text-neutral-300">
                    {m.reason.replace("_", " ")}
                  </span>
                  <span className={m.change_qty < 0 ? "text-red-400" : ""}>
                    {m.change_qty > 0 ? "+" : ""}
                    {m.change_qty} {item.unit}
                  </span>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
