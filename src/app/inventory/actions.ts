"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { getSession } from "@/lib/session";

type ActionState = { error: string } | null;

export async function createInventoryItem(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await getSession();
  if (!session) redirect("/login");

  const name = String(formData.get("name") ?? "").trim();
  const sku = String(formData.get("sku") ?? "").trim();
  const unit = String(formData.get("unit") ?? "pcs").trim() || "pcs";
  const costPrice = Number(formData.get("costPrice"));
  const sellPrice = Number(formData.get("sellPrice"));
  const stockQty = Number(formData.get("stockQty"));
  const reorderPoint = Number(formData.get("reorderPoint"));

  if (!name) return { error: "Nama barang wajib diisi" };
  if (!Number.isFinite(costPrice) || costPrice < 0)
    return { error: "Harga modal tidak valid" };
  if (!Number.isFinite(sellPrice) || sellPrice < 0)
    return { error: "Harga jual tidak valid" };
  if (!Number.isFinite(stockQty) || stockQty < 0)
    return { error: "Stok awal tidak valid" };
  if (!Number.isFinite(reorderPoint) || reorderPoint < 0)
    return { error: "Titik reorder tidak valid" };

  const supabase = createAdminClient();

  const { data: item, error } = await supabase
    .from("inventory_items")
    .insert({
      shop_id: session.shopId,
      name,
      sku: sku || null,
      unit,
      cost_price: costPrice,
      sell_price: sellPrice,
      stock_qty: stockQty,
      reorder_point: reorderPoint,
    })
    .select("id")
    .single();

  if (error || !item) return { error: "Gagal simpan barang" };

  if (stockQty > 0) {
    await supabase.from("stock_movements").insert({
      shop_id: session.shopId,
      inventory_item_id: item.id,
      staff_id: session.staffId,
      change_qty: stockQty,
      reason: "purchase",
    });
  }

  redirect("/inventory");
}

export async function adjustStock(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await getSession();
  if (!session) redirect("/login");

  const itemId = String(formData.get("itemId") ?? "");
  const changeQty = Number(formData.get("changeQty"));
  const reason = String(formData.get("reason") ?? "");

  if (!Number.isFinite(changeQty) || changeQty === 0)
    return { error: "Jumlah penyesuaian tidak valid" };
  if (!["purchase", "adjustment"].includes(reason))
    return { error: "Alasan tidak valid" };

  const supabase = createAdminClient();

  const { data: item } = await supabase
    .from("inventory_items")
    .select("id, stock_qty")
    .eq("id", itemId)
    .eq("shop_id", session.shopId)
    .maybeSingle();

  if (!item) return { error: "Barang tidak ditemukan" };

  const newStock = item.stock_qty + changeQty;
  if (newStock < 0) return { error: "Stok tidak boleh minus" };

  const { error: updateError } = await supabase
    .from("inventory_items")
    .update({ stock_qty: newStock })
    .eq("id", itemId);

  if (updateError) return { error: "Gagal update stok" };

  await supabase.from("stock_movements").insert({
    shop_id: session.shopId,
    inventory_item_id: itemId,
    staff_id: session.staffId,
    change_qty: changeQty,
    reason,
  });

  revalidatePath(`/inventory/${itemId}`);
  revalidatePath("/inventory");
  return null;
}
