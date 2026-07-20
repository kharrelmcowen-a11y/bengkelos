"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { authActionClient } from "@/lib/safe-action";
import { findOrCreateVehicle } from "@/lib/vehicles";

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

    const { vehicleId, customerId } = await findOrCreateVehicle(
      supabase,
      session.shopId,
      parsedInput,
    );

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

const deletePaymentSchema = z.object({
  paymentId: z.string().uuid(),
});

export const deletePayment = authActionClient
  .inputSchema(deletePaymentSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { session } = ctx;
    const supabase = createAdminClient();

    const { data: payment } = await supabase
      .from("payments")
      .select("id, ticket_id, service_tickets(status)")
      .eq("id", parsedInput.paymentId)
      .eq("shop_id", session.shopId)
      .maybeSingle();

    if (!payment) throw new Error("Pembayaran tidak ditemukan");

    const ticket = Array.isArray(payment.service_tickets)
      ? payment.service_tickets[0]
      : payment.service_tickets;

    if (ticket?.status === "completed") {
      throw new Error("Tidak bisa hapus pembayaran pada tiket yang sudah selesai");
    }

    const { error } = await supabase
      .from("payments")
      .delete()
      .eq("id", parsedInput.paymentId)
      .eq("shop_id", session.shopId);

    if (error) throw new Error("Gagal hapus pembayaran");

    revalidatePath(`/tickets/${payment.ticket_id}`);
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

    const [{ data: items }, { data: payments }] = await Promise.all([
      supabase
        .from("ticket_items")
        .select("quantity, unit_price")
        .eq("ticket_id", parsedInput.ticketId),
      supabase
        .from("payments")
        .select("amount")
        .eq("ticket_id", parsedInput.ticketId),
    ]);

    const total = (items ?? []).reduce(
      (sum, item) => sum + item.quantity * item.unit_price,
      0,
    );
    const paid = (payments ?? []).reduce((sum, p) => sum + p.amount, 0);

    if (paid < total) {
      throw new Error("Tiket belum lunas, tidak bisa diselesaikan");
    }

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
