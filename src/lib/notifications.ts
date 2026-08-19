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

// Staff-facing nudge that a finished car still needs its owner told. The link
// opens WhatsApp with the message prefilled; sending stays a human tap, which
// keeps the shop off Meta's per-message pricing and off unofficial gateways.
export async function notifyTicketReady(
  supabase: SupabaseClient,
  shopId: string,
  ticket: { ticketId: string; customerName: string; waLink: string | null },
) {
  const { error } = await supabase.from("notifications").insert({
    shop_id: shopId,
    type: "ticket_completed",
    title: "Kabari customer",
    message: ticket.waLink
      ? `${ticket.customerName} — mobil selesai, kirim WA sekarang`
      : `${ticket.customerName} — mobil selesai, nomor WA belum ada`,
    data: { ticket_id: ticket.ticketId, wa_link: ticket.waLink },
  });

  if (error) {
    logDatabaseError("notifications:ticket_ready", new Error(error.message), { shopId });
  }
}
