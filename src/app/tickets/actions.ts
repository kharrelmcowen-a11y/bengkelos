"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { getSession } from "@/lib/session";

type ActionState = { error: string } | null;

export async function createTicket(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await getSession();
  if (!session) redirect("/login");

  const customerName = String(formData.get("customerName") ?? "").trim();
  const customerPhone = String(formData.get("customerPhone") ?? "").trim();
  const plateNumber = String(formData.get("plateNumber") ?? "")
    .trim()
    .toUpperCase();
  const brand = String(formData.get("brand") ?? "").trim();
  const model = String(formData.get("model") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();

  if (!customerName) return { error: "Nama customer wajib diisi" };
  if (!plateNumber) return { error: "Nomor plat wajib diisi" };

  const supabase = createAdminClient();

  const { data: existingVehicle } = await supabase
    .from("vehicles")
    .select("id, customer_id")
    .eq("shop_id", session.shopId)
    .eq("plate_number", plateNumber)
    .maybeSingle();

  let vehicleId: string;
  let customerId: string;

  if (existingVehicle) {
    vehicleId = existingVehicle.id;
    customerId = existingVehicle.customer_id;
  } else {
    const { data: customer, error: customerError } = await supabase
      .from("customers")
      .insert({
        shop_id: session.shopId,
        name: customerName,
        phone: customerPhone || null,
      })
      .select("id")
      .single();

    if (customerError || !customer) return { error: "Gagal simpan customer" };
    customerId = customer.id;

    const { data: vehicle, error: vehicleError } = await supabase
      .from("vehicles")
      .insert({
        shop_id: session.shopId,
        customer_id: customerId,
        plate_number: plateNumber,
        brand: brand || null,
        model: model || null,
      })
      .select("id")
      .single();

    if (vehicleError || !vehicle) return { error: "Gagal simpan kendaraan" };
    vehicleId = vehicle.id;
  }

  const { data: ticket, error: ticketError } = await supabase
    .from("service_tickets")
    .insert({
      shop_id: session.shopId,
      customer_id: customerId,
      vehicle_id: vehicleId,
      staff_id: session.staffId,
      notes: notes || null,
    })
    .select("id")
    .single();

  if (ticketError || !ticket) return { error: "Gagal buat tiket servis" };

  redirect(`/tickets/${ticket.id}`);
}

export async function addTicketItem(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await getSession();
  if (!session) redirect("/login");

  const ticketId = String(formData.get("ticketId") ?? "");
  const inventoryItemId = String(formData.get("inventoryItemId") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const quantity = Number(formData.get("quantity"));
  const unitPrice = Number(formData.get("unitPrice"));

  if (!description) return { error: "Deskripsi item wajib diisi" };
  if (!Number.isFinite(quantity) || quantity <= 0)
    return { error: "Jumlah harus lebih dari 0" };
  if (!Number.isFinite(unitPrice) || unitPrice < 0)
    return { error: "Harga tidak valid" };

  const supabase = createAdminClient();

  const { data: ticket } = await supabase
    .from("service_tickets")
    .select("id")
    .eq("id", ticketId)
    .eq("shop_id", session.shopId)
    .maybeSingle();

  if (!ticket) return { error: "Tiket tidak ditemukan" };

  if (inventoryItemId) {
    const { data: inventoryItem } = await supabase
      .from("inventory_items")
      .select("id")
      .eq("id", inventoryItemId)
      .eq("shop_id", session.shopId)
      .maybeSingle();

    if (!inventoryItem) return { error: "Barang stok tidak ditemukan" };
  }

  const { error } = await supabase.from("ticket_items").insert({
    shop_id: session.shopId,
    ticket_id: ticketId,
    inventory_item_id: inventoryItemId || null,
    description,
    quantity,
    unit_price: unitPrice,
  });

  if (error) return { error: "Gagal tambah item" };

  revalidatePath(`/tickets/${ticketId}`);
  return null;
}

export async function addPayment(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await getSession();
  if (!session) redirect("/login");

  const ticketId = String(formData.get("ticketId") ?? "");
  const amount = Number(formData.get("amount"));
  const method = String(formData.get("method") ?? "");

  if (!Number.isFinite(amount) || amount <= 0)
    return { error: "Jumlah bayar tidak valid" };
  if (!["cash", "transfer", "qris", "card"].includes(method))
    return { error: "Metode bayar tidak valid" };

  const supabase = createAdminClient();

  const { data: ticket } = await supabase
    .from("service_tickets")
    .select("id")
    .eq("id", ticketId)
    .eq("shop_id", session.shopId)
    .maybeSingle();

  if (!ticket) return { error: "Tiket tidak ditemukan" };

  const { error } = await supabase.from("payments").insert({
    shop_id: session.shopId,
    ticket_id: ticketId,
    staff_id: session.staffId,
    amount,
    method,
  });

  if (error) return { error: "Gagal simpan pembayaran" };

  revalidatePath(`/tickets/${ticketId}`);
  return null;
}

export async function completeTicket(formData: FormData): Promise<void> {
  const session = await getSession();
  if (!session) redirect("/login");

  const ticketId = String(formData.get("ticketId") ?? "");
  const supabase = createAdminClient();

  const { data: ticket } = await supabase
    .from("service_tickets")
    .select("id, status")
    .eq("id", ticketId)
    .eq("shop_id", session.shopId)
    .maybeSingle();

  if (!ticket || ticket.status === "completed") return;

  const { data: stockedItems } = await supabase
    .from("ticket_items")
    .select("inventory_item_id, quantity")
    .eq("ticket_id", ticketId)
    .not("inventory_item_id", "is", null);

  for (const stockedItem of stockedItems ?? []) {
    const { data: inventoryItem } = await supabase
      .from("inventory_items")
      .select("stock_qty")
      .eq("id", stockedItem.inventory_item_id!)
      .single();

    if (!inventoryItem) continue;

    await supabase
      .from("inventory_items")
      .update({ stock_qty: inventoryItem.stock_qty - stockedItem.quantity })
      .eq("id", stockedItem.inventory_item_id!);

    await supabase.from("stock_movements").insert({
      shop_id: session.shopId,
      inventory_item_id: stockedItem.inventory_item_id,
      staff_id: session.staffId,
      change_qty: -stockedItem.quantity,
      reason: "ticket_deduct",
      reference_id: ticketId,
    });
  }

  await supabase
    .from("service_tickets")
    .update({ status: "completed", completed_at: new Date().toISOString() })
    .eq("id", ticketId)
    .eq("shop_id", session.shopId);

  revalidatePath(`/tickets/${ticketId}`);
  revalidatePath("/tickets");
  revalidatePath("/inventory");
}
