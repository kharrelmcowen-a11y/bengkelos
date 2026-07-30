import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { createAdminClient } from "@/lib/supabase/admin";
import { AppointmentActions } from "./AppointmentActions";
import { formatDate } from "@/lib/format";
import { PageShell } from "@/components/page-shell";
import { PageHeader } from "@/components/page-header";
import { AnimatedButton } from "@/components/ui/animated-button";
import { ModernCard } from "@/components/ui/modern-card";
import { GradientBackground } from "@/components/ui/gradient-bg";
import { PlusCircle, CalendarClock, Clock, User } from "lucide-react";

export default async function AppointmentsPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const supabase = createAdminClient();
  const { data: appointments } = await supabase
    .from("appointments")
    .select(
      "id, customer_name, plate_number, brand, model, scheduled_at, notes",
    )
    .eq("shop_id", session.shopId)
    .eq("status", "scheduled")
    .order("scheduled_at", { ascending: true });

  const groups = new Map<
    string,
    NonNullable<typeof appointments>
  >();
  for (const appointment of appointments ?? []) {
    const day = formatDate(appointment.scheduled_at);
    const existing = groups.get(day) ?? [];
    existing.push(appointment);
    groups.set(day, existing);
  }

  return (
    <PageShell>
      <GradientBackground />
      <PageHeader
        title="Jadwal servis"
        backHref="/dashboard"
        backLabel="Dashboard"
        action={
          <AnimatedButton
            href="/appointments/new"
            size="sm"
            className="gradient-border"
          >
            <PlusCircle className="size-4" />
            Jadwal baru
          </AnimatedButton>
        }
      />

      {groups.size === 0 ? (
        <ModernCard className="p-8 text-center">
          <CalendarClock className="size-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Belum ada jadwal servis.</p>
          <AnimatedButton 
            href="/appointments/new" 
            className="mt-4"
          >
            Buat jadwal pertama
          </AnimatedButton>
        </ModernCard>
      ) : (
        <div className="space-y-8">
          {Array.from(groups.entries()).map(([day, dayAppointments]) => (
            <section key={day}>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CalendarClock className="size-5 text-primary" />
                {day}
              </h2>
              <div className="space-y-4">
                {dayAppointments.map((appointment) => (
                  <ModernCard key={appointment.id} className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <User className="size-5 text-primary" />
                        </div>
                        <div>
                          <span className="font-semibold text-lg">
                            {appointment.customer_name}
                          </span>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <Clock className="size-4" />
                            {new Intl.DateTimeFormat("id-ID", {
                              timeStyle: "short",
                            }).format(new Date(appointment.scheduled_at))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-3 mb-3">
                      <p className="text-sm">
                        {appointment.plate_number} — {appointment.brand} {appointment.model}
                      </p>
                    </div>
                    {appointment.notes && (
                      <p className="text-sm text-muted-foreground mb-3">
                        {appointment.notes}
                      </p>
                    )}
                    <AppointmentActions appointmentId={appointment.id} />
                  </ModernCard>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </PageShell>
  );
}
