"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { authActionClient } from "@/lib/safe-action";

const createInventoryItemSchema = z.object({
  name: z.string().trim().min(1, "Nama barang wajib diisi"),
  sku: z.string().trim().optional().default(""),
  unit: z.string().trim().optional().default("pcs"),
  costPrice: z.coerce.number().min(0, "Harga modal tidak valid"),
  sellPrice: z.coerce.number().min(0, "Harga jual tidak valid"),
  stockQty: z.coerce.number().min(0, "Stok awal tidak valid"),
  reorderPoint: z.coerce.number().min(0, "Titik reorder tidak valid"),
});

export const createInventoryItem = authActionClient
  .inputSchema(createInventoryItemSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { session } = ctx;
    const supabase = createAdminClient();

    const { data: item, error } = await supabase
      .from("inventory_items")
      .insert({
        shop_id: session.shopId,
        name: parsedInput.name,
        sku: parsedInput.sku || null,
        unit: parsedInput.unit || "pcs",
        cost_price: parsedInput.costPrice,
        sell_price: parsedInput.sellPrice,
        stock_qty: parsedInput.stockQty,
        reorder_point: parsedInput.reorderPoint,
      })
      .select("id")
      .single();

    if (error || !item) throw new Error("Gagal simpan barang");

    if (parsedInput.stockQty > 0) {
      await supabase.from("stock_movements").insert({
        shop_id: session.shopId,
        inventory_item_id: item.id,
        staff_id: session.staffId,
        change_qty: parsedInput.stockQty,
        reason: "purchase",
      });
    }

    redirect("/inventory");
  });

const adjustStockSchema = z.object({
  itemId: z.string().uuid(),
  changeQty: z.coerce.number().refine((v) => v !== 0, {
    message: "Jumlah penyesuaian tidak valid",
  }),
  reason: z.enum(["purchase", "adjustment"], {
    error: "Alasan tidak valid",
  }),
});

export const adjustStock = authActionClient
  .inputSchema(adjustStockSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { session } = ctx;
    const supabase = createAdminClient();

    const { data: item } = await supabase
      .from("inventory_items")
      .select("id, stock_qty")
      .eq("id", parsedInput.itemId)
      .eq("shop_id", session.shopId)
      .maybeSingle();

    if (!item) throw new Error("Barang tidak ditemukan");

    const newStock = item.stock_qty + parsedInput.changeQty;
    if (newStock < 0) throw new Error("Stok tidak boleh minus");

    const { error: updateError } = await supabase
      .from("inventory_items")
      .update({ stock_qty: newStock })
      .eq("id", parsedInput.itemId);

    if (updateError) throw new Error("Gagal update stok");

    await supabase.from("stock_movements").insert({
      shop_id: session.shopId,
      inventory_item_id: parsedInput.itemId,
      staff_id: session.staffId,
      change_qty: parsedInput.changeQty,
      reason: parsedInput.reason,
    });

    revalidatePath(`/inventory/${parsedInput.itemId}`);
    revalidatePath("/inventory");
  });
