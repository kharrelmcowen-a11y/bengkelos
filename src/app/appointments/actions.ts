"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { authActionClient } from "@/lib/safe-action";
import { findOrCreateVehicle } from "@/lib/vehicles";

const createAppointmentSchema = z.object({
  customerName: z.string().trim().min(1, "Nama customer wajib diisi"),
  customerPhone: z.string().trim().optional().default(""),
  plateNumber: z
    .string()
    .trim()
    .min(1, "Nomor plat wajib diisi")
    .transform((s) => s.toUpperCase()),
  brand: z.string().trim().optional().default(""),
  model: z.string().trim().optional().default(""),
  scheduledAt: z.string().trim().min(1, "Waktu janji wajib diisi"),
  notes: z.string().trim().optional().default(""),
});

export const createAppointment = authActionClient
  .inputSchema(createAppointmentSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { session } = ctx;
    const supabase = createAdminClient();

    const scheduledAt = new Date(parsedInput.scheduledAt);
    if (Number.isNaN(scheduledAt.getTime())) {
      throw new Error("Waktu janji tidak valid");
    }

    const { error } = await supabase.from("appointments").insert({
      shop_id: session.shopId,
      staff_id: session.staffId,
      customer_name: parsedInput.customerName,
      customer_phone: parsedInput.customerPhone || null,
      plate_number: parsedInput.plateNumber,
      brand: parsedInput.brand || null,
      model: parsedInput.model || null,
      scheduled_at: scheduledAt.toISOString(),
      notes: parsedInput.notes || null,
    });

    if (error) throw new Error("Gagal simpan jadwal");

    redirect("/appointments");
  });

const markArrivedSchema = z.object({
  appointmentId: z.string().uuid(),
});

export const markArrived = authActionClient
  .inputSchema(markArrivedSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { session } = ctx;
    const supabase = createAdminClient();

    const { data: appointment } = await supabase
      .from("appointments")
      .select(
        "id, status, customer_name, customer_phone, plate_number, brand, model, notes",
      )
      .eq("id", parsedInput.appointmentId)
      .eq("shop_id", session.shopId)
      .maybeSingle();

    if (!appointment) throw new Error("Jadwal tidak ditemukan");
    if (appointment.status !== "scheduled") {
      throw new Error("Jadwal ini sudah diproses");
    }

    const { vehicleId, customerId } = await findOrCreateVehicle(
      supabase,
      session.shopId,
      {
        plateNumber: appointment.plate_number,
        customerName: appointment.customer_name,
        customerPhone: appointment.customer_phone ?? undefined,
        brand: appointment.brand ?? undefined,
        model: appointment.model ?? undefined,
      },
    );

    const { data: ticket, error: ticketError } = await supabase
      .from("service_tickets")
      .insert({
        shop_id: session.shopId,
        customer_id: customerId,
        vehicle_id: vehicleId,
        staff_id: session.staffId,
        notes: appointment.notes,
      })
      .select("id")
      .single();

    if (ticketError || !ticket) throw new Error("Gagal buat tiket servis");

    const { error: updateError } = await supabase
      .from("appointments")
      .update({ status: "arrived", ticket_id: ticket.id })
      .eq("id", appointment.id);

    if (updateError) throw new Error("Gagal update jadwal");

    redirect(`/tickets/${ticket.id}`);
  });

const cancelAppointmentSchema = z.object({
  appointmentId: z.string().uuid(),
});

export const cancelAppointment = authActionClient
  .inputSchema(cancelAppointmentSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { session } = ctx;
    const supabase = createAdminClient();

    const { data: appointment } = await supabase
      .from("appointments")
      .select("id, status")
      .eq("id", parsedInput.appointmentId)
      .eq("shop_id", session.shopId)
      .maybeSingle();

    if (!appointment) throw new Error("Jadwal tidak ditemukan");
    if (appointment.status !== "scheduled") {
      throw new Error("Jadwal ini sudah diproses");
    }

    const { error } = await supabase
      .from("appointments")
      .update({ status: "cancelled" })
      .eq("id", appointment.id);

    if (error) throw new Error("Gagal batalkan jadwal");

    revalidatePath("/appointments");
  });
