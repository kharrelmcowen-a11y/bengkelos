"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { authActionClient } from "@/lib/safe-action";

const createTicketSchema = z.object({
  customerName: z.string().trim().min(1, "Nama customer wajib diisi"),
  customerPhone: z.string().trim().optional().default(""),
  plateNumber: z
    .string()
    .trim()
    .min(1, "Nomor plat wajib diisi")
    .transform((s) => s.toUpperCase()),
  brand: z.string().trim().optional().default(""),
  model: z.string().trim().optional().default(""),
  notes: z.string().trim().optional().default(""),
});

export const createTicket = authActionClient
  .inputSchema(createTicketSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { session } = ctx;
    const supabase = createAdminClient();

    const { data: existingVehicle } = await supabase
      .from("vehicles")
      .select("id, customer_id")
      .eq("shop_id", session.shopId)
      .eq("plate_number", parsedInput.plateNumber)
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
          name: parsedInput.customerName,
          phone: parsedInput.customerPhone || null,
        })
        .select("id")
        .single();

      if (customerError || !customer) throw new Error("Gagal simpan customer");
      customerId = customer.id;

      const { data: vehicle, error: vehicleError } = await supabase
        .from("vehicles")
        .insert({
          shop_id: session.shopId,
          customer_id: customerId,
          plate_number: parsedInput.plateNumber,
          brand: parsedInput.brand || null,
          model: parsedInput.model || null,
        })
        .select("id")
        .single();

      if (vehicleError || !vehicle) throw new Error("Gagal simpan kendaraan");
      vehicleId = vehicle.id;
    }

    const { data: ticket, error: ticketError } = await supabase
      .from("service_tickets")
      .insert({
        shop_id: session.shopId,
        customer_id: customerId,
        vehicle_id: vehicleId,
        staff_id: session.staffId,
        notes: parsedInput.notes || null,
      })
      .select("id")
      .single();

    if (ticketError || !ticket) throw new Error("Gagal buat tiket servis");

    redirect(`/tickets/${ticket.id}`);
  });

const addTicketItemSchema = z.object({
  ticketId: z.string().uuid(),
  inventoryItemId: z.string().trim().optional().default(""),
  description: z.string().trim().min(1, "Deskripsi item wajib diisi"),
  quantity: z.coerce.number().positive("Jumlah harus lebih dari 0"),
  unitPrice: z.coerce.number().min(0, "Harga tidak valid"),
});

export const addTicketItem = authActionClient
  .inputSchema(addTicketItemSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { session } = ctx;
    const supabase = createAdminClient();

    const { data: ticket } = await supabase
      .from("service_tickets")
      .select("id")
      .eq("id", parsedInput.ticketId)
      .eq("shop_id", session.shopId)
      .maybeSingle();

    if (!ticket) throw new Error("Tiket tidak ditemukan");

    if (parsedInput.inventoryItemId) {
      const { data: inventoryItem } = await supabase
        .from("inventory_items")
        .select("id")
        .eq("id", parsedInput.inventoryItemId)
        .eq("shop_id", session.shopId)
        .maybeSingle();

      if (!inventoryItem) throw new Error("Barang stok tidak ditemukan");
    }

    const { error } = await supabase.from("ticket_items").insert({
      shop_id: session.shopId,
      ticket_id: parsedInput.ticketId,
      inventory_item_id: parsedInput.inventoryItemId || null,
      description: parsedInput.description,
      quantity: parsedInput.quantity,
      unit_price: parsedInput.unitPrice,
    });

    if (error) throw new Error("Gagal tambah item");

    revalidatePath(`/tickets/${parsedInput.ticketId}`);
  });

const addPaymentSchema = z.object({
  ticketId: z.string().uuid(),
  amount: z.coerce.number().positive("Jumlah bayar tidak valid"),
  method: z.enum(["cash", "transfer", "qris", "card"], {
    error: "Metode bayar tidak valid",
  }),
});

export const addPayment = authActionClient
  .inputSchema(addPaymentSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { session } = ctx;
    const supabase = createAdminClient();

    const { data: ticket } = await supabase
      .from("service_tickets")
      .select("id")
      .eq("id", parsedInput.ticketId)
      .eq("shop_id", session.shopId)
      .maybeSingle();

    if (!ticket) throw new Error("Tiket tidak ditemukan");

    const { error } = await supabase.from("payments").insert({
      shop_id: session.shopId,
      ticket_id: parsedInput.ticketId,
      staff_id: session.staffId,
      amount: parsedInput.amount,
      method: parsedInput.method,
    });

    if (error) throw new Error("Gagal simpan pembayaran");

    revalidatePath(`/tickets/${parsedInput.ticketId}`);
  });

const completeTicketSchema = z.object({
  ticketId: z.string().uuid(),
});

export const completeTicket = authActionClient
  .inputSchema(completeTicketSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { session } = ctx;
    const supabase = createAdminClient();

    const { data: ticket } = await supabase
      .from("service_tickets")
      .select("id, status")
      .eq("id", parsedInput.ticketId)
      .eq("shop_id", session.shopId)
      .maybeSingle();

    if (!ticket || ticket.status === "completed") return;

    const { data: stockedItems } = await supabase
      .from("ticket_items")
      .select("inventory_item_id, quantity")
      .eq("ticket_id", parsedInput.ticketId)
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
        reference_id: parsedInput.ticketId,
      });
    }

    await supabase
      .from("service_tickets")
      .update({ status: "completed", completed_at: new Date().toISOString() })
      .eq("id", parsedInput.ticketId)
      .eq("shop_id", session.shopId);

    revalidatePath(`/tickets/${parsedInput.ticketId}`);
    revalidatePath("/tickets");
    revalidatePath("/inventory");
  });
