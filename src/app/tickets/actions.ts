"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient as createStorageClient } from "@supabase/supabase-js";
import { authActionClient } from "@/lib/safe-action";
import { findOrCreateVehicle } from "@/lib/vehicles";
import { logAction, logActionError } from "@/lib/logger";
import {
  ALLOWED_ATTACHMENT_MIME_TYPES,
  MAX_ATTACHMENT_BYTES,
  sanitizeFileName,
} from "@/lib/attachments";
import { isLowStock } from "@/lib/inventory";
import { notifyLowStock } from "@/lib/notifications";

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

    if (ticketError || !ticket) {
      logActionError('createTicket', ticketError || new Error("Gagal buat tiket servis"), { 
        shopId: session.shopId, 
        customerId, 
        vehicleId 
      });
      throw new Error("Gagal buat tiket servis");
    }

    logAction('createTicket', { 
      ticketId: ticket.id, 
      shopId: session.shopId, 
      customerId, 
      vehicleId 
    });
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
      .select("id, status, customer_id")
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

    const { data: stockedItems, error: stockedItemsError } = await supabase
      .from("ticket_items")
      .select("inventory_item_id, quantity")
      .eq("ticket_id", parsedInput.ticketId)
      .not("inventory_item_id", "is", null);

    // Completing the ticket without this list would mark it done while the
    // parts it consumed stay on the shelf, so stop rather than under-deduct.
    if (stockedItemsError) {
      logActionError("completeTicket", new Error(stockedItemsError.message), {
        ticketId: parsedInput.ticketId,
        shopId: session.shopId,
      });
      throw new Error("Gagal baca item tiket, tiket belum diselesaikan");
    }

    for (const stockedItem of stockedItems ?? []) {
      const { data: inventoryItem, error: inventoryItemError } = await supabase
        .from("inventory_items")
        .select("id, name, stock_qty, reorder_point")
        .eq("id", stockedItem.inventory_item_id!)
        .single();

      if (inventoryItemError || !inventoryItem) {
        logActionError(
          "completeTicket",
          new Error(inventoryItemError?.message ?? "inventory item missing"),
          {
            ticketId: parsedInput.ticketId,
            shopId: session.shopId,
            inventoryItemId: stockedItem.inventory_item_id,
          },
        );
        continue;
      }

      const stockAfter = inventoryItem.stock_qty - stockedItem.quantity;

      const { error: stockUpdateError } = await supabase
        .from("inventory_items")
        .update({ stock_qty: stockAfter })
        .eq("id", stockedItem.inventory_item_id!);

      if (stockUpdateError) {
        logActionError("completeTicket", new Error(stockUpdateError.message), {
          ticketId: parsedInput.ticketId,
          shopId: session.shopId,
          inventoryItemId: stockedItem.inventory_item_id,
        });
        throw new Error("Gagal kurangi stok, tiket belum diselesaikan");
      }

      await supabase.from("stock_movements").insert({
        shop_id: session.shopId,
        inventory_item_id: stockedItem.inventory_item_id,
        staff_id: session.staffId,
        change_qty: -stockedItem.quantity,
        reason: "ticket_deduct",
        reference_id: parsedInput.ticketId,
      });

      const stockLevel = { ...inventoryItem, stock_qty: stockAfter };
      if (isLowStock(stockLevel)) {
        await notifyLowStock(supabase, session.shopId, stockLevel);
      }
    }

    await supabase
      .from("service_tickets")
      .update({ status: "completed", completed_at: new Date().toISOString() })
      .eq("id", parsedInput.ticketId)
      .eq("shop_id", session.shopId);

    // Update customer loyalty information
    await supabase.rpc('update_customer_loyalty', {
      p_customer_id: ticket.customer_id,
      p_amount: total
    });

    logAction('completeTicket', { 
      ticketId: parsedInput.ticketId, 
      shopId: session.shopId, 
      total, 
      paid,
      customerId: ticket.customer_id
    });

    revalidatePath(`/tickets/${parsedInput.ticketId}`);
    revalidatePath("/tickets");
    revalidatePath("/inventory");
  });

const uploadAttachmentSchema = z.object({
  ticketId: z.string().uuid(),
  fileName: z.string().trim().min(1, "Nama file wajib diisi"),
  fileType: z.enum(["before", "after", "document", "other"]),
  fileSize: z.number().positive("Ukuran file tidak valid"),
  mimeType: z.enum(ALLOWED_ATTACHMENT_MIME_TYPES, {
    message: "Tipe file tidak didukung. Hanya gambar dan PDF.",
  }),
  // Base64 encoded. Size is checked against the decoded bytes below, not this
  // string's length or the client-reported fileSize.
  fileData: z.string().trim().min(1, "Data file wajib diisi"),
});

export const uploadAttachment = authActionClient
  .inputSchema(uploadAttachmentSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { session } = ctx;
    const supabase = createAdminClient();
    
    // Verify ticket exists and belongs to shop
    const { data: ticket } = await supabase
      .from("service_tickets")
      .select("id")
      .eq("id", parsedInput.ticketId)
      .eq("shop_id", session.shopId)
      .maybeSingle();

    if (!ticket) {
      logActionError('uploadAttachment', new Error("Tiket tidak ditemukan"), { 
        ticketId: parsedInput.ticketId 
      });
      throw new Error("Tiket tidak ditemukan");
    }

    const body = Buffer.from(parsedInput.fileData, "base64");
    if (body.byteLength > MAX_ATTACHMENT_BYTES) {
      logActionError('uploadAttachment', new Error("File terlalu besar"), {
        ticketId: parsedInput.ticketId,
        bytes: body.byteLength,
      });
      throw new Error("File terlalu besar. Maksimal 10MB.");
    }

    // Upload to Supabase Storage
    const storageClient = createStorageClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    const fileName = `${parsedInput.ticketId}/${Date.now()}-${sanitizeFileName(parsedInput.fileName)}`;
    const { data: uploadData, error: uploadError } = await storageClient
      .storage
      .from("ticket-attachments")
      .upload(fileName, body, {
        contentType: parsedInput.mimeType,
        upsert: false,
      });

    if (uploadError || !uploadData) {
      logActionError('uploadAttachment', uploadError || new Error("Gagal upload file"), { 
        ticketId: parsedInput.ticketId,
        fileName: parsedInput.fileName
      });
      throw new Error("Gagal upload file");
    }

    // Get public URL
    const { data: { publicUrl } } = storageClient
      .storage
      .from("ticket-attachments")
      .getPublicUrl(fileName);

    // Save attachment record
    const { error: dbError } = await supabase.from("ticket_attachments").insert({
      shop_id: session.shopId,
      ticket_id: parsedInput.ticketId,
      file_url: publicUrl,
      file_name: parsedInput.fileName,
      file_type: parsedInput.fileType,
      file_size: parsedInput.fileSize,
      mime_type: parsedInput.mimeType,
      uploaded_by: session.staffId,
    });

    if (dbError) {
      logActionError('uploadAttachment', dbError, { 
        ticketId: parsedInput.ticketId,
        fileName: parsedInput.fileName
      });
      throw new Error("Gagal simpan data attachment");
    }

    logAction('uploadAttachment', { 
      ticketId: parsedInput.ticketId, 
      fileName: parsedInput.fileName,
      fileType: parsedInput.fileType
    });

    revalidatePath(`/tickets/${parsedInput.ticketId}`);
  });

const deleteAttachmentSchema = z.object({
  attachmentId: z.string().uuid(),
});

export const deleteAttachment = authActionClient
  .inputSchema(deleteAttachmentSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { session } = ctx;
    const supabase = createAdminClient();

    const { data: attachment } = await supabase
      .from("ticket_attachments")
      .select("id, ticket_id, file_url")
      .eq("id", parsedInput.attachmentId)
      .eq("shop_id", session.shopId)
      .maybeSingle();

    if (!attachment) {
      logActionError('deleteAttachment', new Error("Attachment tidak ditemukan"), { 
        attachmentId: parsedInput.attachmentId 
      });
      throw new Error("Attachment tidak ditemukan");
    }

    // Delete from storage
    const storageClient = createStorageClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    const fileName = attachment.file_url.split("/").pop();
    if (fileName) {
      await storageClient
        .storage
        .from("ticket-attachments")
        .remove([`${attachment.ticket_id}/${fileName}`]);
    }

    // Delete from database
    const { error } = await supabase
      .from("ticket_attachments")
      .delete()
      .eq("id", parsedInput.attachmentId)
      .eq("shop_id", session.shopId);

    if (error) {
      logActionError('deleteAttachment', error, { 
        attachmentId: parsedInput.attachmentId 
      });
      throw new Error("Gagal hapus attachment");
    }

    logAction('deleteAttachment', { 
      attachmentId: parsedInput.attachmentId,
      ticketId: attachment.ticket_id
    });

    revalidatePath(`/tickets/${attachment.ticket_id}`);
  });
