import { SupabaseClient } from "@supabase/supabase-js";
import { logDatabaseError } from "./logger";

// Shop-wide low-stock alert, raised when a deduction drops an item to or below
// its reorder point. Re-alerting on every deduction would bury the bell, so an
// item that already has an unread alert stays quiet until someone reads it.
export async function notifyLowStock(
  supabase: SupabaseClient,
  shopId: string,
  item: { id: string; name: string; stock_qty: number; reorder_point: number },
) {
  const { data: pending, error: pendingError } = await supabase
    .from("notifications")
    .select("id")
    .eq("shop_id", shopId)
    .eq("type", "low_stock")
    .is("read_at", null)
    .eq("data->>item_id", item.id)
    .limit(1);

  if (pendingError) {
    logDatabaseError("notifications:low_stock_pending", new Error(pendingError.message), { shopId });
    return;
  }
  if (pending && pending.length > 0) return;

  const { error } = await supabase.from("notifications").insert({
    shop_id: shopId,
    type: "low_stock",
    title: "Stok barang rendah",
    message: `${item.name} tersisa ${item.stock_qty} unit (batas: ${item.reorder_point})`,
    data: {
      item_id: item.id,
      current_qty: item.stock_qty,
      reorder_point: item.reorder_point,
    },
  });

  if (error) {
    logDatabaseError("notifications:low_stock_insert", new Error(error.message), { shopId });
  }
}
