import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { logger, logDatabaseError } from "@/lib/logger";
import { formatWibTime, wibDayWindow } from "@/lib/time";

// Vercel sends the cron secret as a bearer token; without it the route is open
// to anyone who guesses the path.
function isAuthorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

type AppointmentRow = {
  id: string;
  shop_id: string;
  customer_name: string;
  scheduled_at: string;
};

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  const { start, end } = wibDayWindow(new Date());

  const { data: appointments, error } = await supabase
    .from("appointments")
    .select("id, shop_id, customer_name, scheduled_at")
    .eq("status", "scheduled")
    .gte("scheduled_at", start.toISOString())
    .lt("scheduled_at", end.toISOString())
    .order("scheduled_at", { ascending: true });

  if (error) {
    logDatabaseError("cron:appointment_reminders", new Error(error.message));
    return NextResponse.json({ error: "Query failed" }, { status: 500 });
  }

  const due = (appointments ?? []) as AppointmentRow[];
  if (due.length === 0) {
    return NextResponse.json({ reminded: 0, skipped: 0 });
  }

  // A re-run on the same day must not file the reminder twice.
  const { data: existing, error: existingError } = await supabase
    .from("notifications")
    .select("data")
    .eq("type", "appointment_reminder")
    .gte("created_at", start.toISOString());

  if (existingError) {
    logDatabaseError("cron:appointment_reminders_existing", new Error(existingError.message));
    return NextResponse.json({ error: "Query failed" }, { status: 500 });
  }

  const alreadySent = new Set(
    (existing ?? []).map((row) => (row.data as { appointment_id?: string } | null)?.appointment_id),
  );
  const pending = due.filter((appointment) => !alreadySent.has(appointment.id));

  if (pending.length > 0) {
    const { error: insertError } = await supabase.from("notifications").insert(
      pending.map((appointment) => ({
        shop_id: appointment.shop_id,
        type: "appointment_reminder",
        title: "Jadwal servis hari ini",
        message: `${appointment.customer_name} dijadwalkan pukul ${formatWibTime(appointment.scheduled_at)}`,
        data: {
          appointment_id: appointment.id,
          customer_name: appointment.customer_name,
          scheduled_at: appointment.scheduled_at,
        },
      })),
    );

    if (insertError) {
      logDatabaseError("cron:appointment_reminders_insert", new Error(insertError.message));
      return NextResponse.json({ error: "Insert failed" }, { status: 500 });
    }
  }

  logger.info("cron:appointment_reminders", `reminded ${pending.length} of ${due.length}`);
  return NextResponse.json({ reminded: pending.length, skipped: due.length - pending.length });
}
