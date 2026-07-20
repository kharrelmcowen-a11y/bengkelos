import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { createAdminClient } from "@/lib/supabase/admin";
import { AppointmentActions } from "./AppointmentActions";
import { formatDate } from "@/lib/format";
import { PageShell } from "@/components/page-shell";
import { PageHeader } from "@/components/page-header";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

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
      <PageHeader
        title="Jadwal servis"
        backHref="/dashboard"
        backLabel="Dashboard"
        action={
          <Link
            href="/appointments/new"
            className={buttonVariants({ size: "sm" })}
          >
            <PlusCircle className="size-4" />
            Jadwal baru
          </Link>
        }
      />

      {groups.size === 0 ? (
        <p className="text-sm text-muted-foreground">
          Belum ada jadwal servis.
        </p>
      ) : (
        <div className="space-y-6">
          {Array.from(groups.entries()).map(([day, dayAppointments]) => (
            <section key={day}>
              <h2 className="text-sm font-medium text-muted-foreground">
                {day}
              </h2>
              <div className="mt-2 space-y-3">
                {dayAppointments.map((appointment) => (
                  <Card key={appointment.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">
                        {appointment.customer_name}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {new Intl.DateTimeFormat("id-ID", {
                          timeStyle: "short",
                        }).format(new Date(appointment.scheduled_at))}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {appointment.plate_number} — {appointment.brand}{" "}
                      {appointment.model}
                    </p>
                    {appointment.notes && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {appointment.notes}
                      </p>
                    )}
                    <AppointmentActions appointmentId={appointment.id} />
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </PageShell>
  );
}
