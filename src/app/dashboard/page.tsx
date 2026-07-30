import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { logout, getDashboardMetrics } from "./actions";
import { PageShell } from "@/components/page-shell";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatIDR } from "@/lib/format";
import { NotificationBell } from "@/components/notifications";
import {
  PlusCircle,
  Wrench,
  Package,
  LineChart,
  Search,
  CalendarClock,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Users,
  Trophy,
  BarChart3,
} from "lucide-react";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const metrics = await getDashboardMetrics();

  return (
    <PageShell maxWidth="max-w-md">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Halo, {session.name}</h1>
          <Badge variant="secondary" className="mt-1 capitalize">
            {session.role}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <NotificationBell />
          <form action={logout}>
            <Button type="submit" variant="ghost" size="sm">
              Keluar
            </Button>
          </form>
        </div>
      </div>

      {/* Dashboard Metrics */}
      {metrics && (
        <div className="mt-6 space-y-4">
          {/* Revenue Card */}
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pendapatan hari ini</p>
                <p className="text-2xl font-semibold">{formatIDR(metrics.todayRevenue)}</p>
              </div>
              <div className="flex items-center gap-1 text-sm">
                {metrics.revenueChange >= 0 ? (
                  <TrendingUp className="size-4 text-green-500" />
                ) : (
                  <TrendingDown className="size-4 text-red-500" />
                )}
                <span className={metrics.revenueChange >= 0 ? "text-green-500" : "text-red-500"}>
                  {Math.abs(metrics.revenueChange).toFixed(0)}%
                </span>
              </div>
            </div>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-3">
              <div className="flex items-center gap-2">
                <Wrench className="size-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Tiket hari ini</p>
                  <p className="text-lg font-semibold">{metrics.todayTickets}</p>
                </div>
              </div>
            </Card>
            <Card className="p-3">
              <div className="flex items-center gap-2">
                <Users className="size-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Tiket aktif</p>
                  <p className="text-lg font-semibold">{metrics.activeTickets}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Low Stock Alert */}
          {metrics.lowStockItems.length > 0 && (
            <Card className="p-3 border-destructive/50 bg-destructive/5">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="size-4 text-destructive" />
                <p className="text-sm font-medium text-destructive">Stok rendah</p>
              </div>
              <div className="space-y-1">
                {metrics.lowStockItems.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{item.name}</span>
                    <span className="font-medium">{item.stock_qty} {item.reorder_point > 0 && `(${item.reorder_point})`}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Today's Appointments */}
          {metrics.todayAppointments.length > 0 && (
            <Card className="p-3">
              <div className="flex items-center gap-2 mb-2">
                <CalendarClock className="size-4 text-muted-foreground" />
                <p className="text-sm font-medium">Jadwal hari ini</p>
              </div>
              <div className="space-y-1">
                {metrics.todayAppointments.slice(0, 3).map((apt) => (
                  <div key={apt.id} className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{apt.customer_name}</span>
                    <span className="font-medium">
                      {new Intl.DateTimeFormat("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                      }).format(new Date(apt.scheduled_at))}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      )}

      <div className="mt-6 space-y-3">
        <Link
          href="/tickets/new"
          className={buttonVariants({
            className: "h-auto w-full justify-start gap-3 py-3",
          })}
        >
          <PlusCircle className="size-4" />
          Tiket servis baru
        </Link>
        <Link
          href="/tickets"
          className={buttonVariants({
            variant: "outline",
            className: "h-auto w-full justify-start gap-3 py-3",
          })}
        >
          <Wrench className="size-4" />
          Lihat tiket aktif
        </Link>
        <Link
          href="/inventory"
          className={buttonVariants({
            variant: "outline",
            className: "h-auto w-full justify-start gap-3 py-3",
          })}
        >
          <Package className="size-4" />
          Stok barang
        </Link>
        <Link
          href="/appointments"
          className={buttonVariants({
            variant: "outline",
            className: "h-auto w-full justify-start gap-3 py-3",
          })}
        >
          <CalendarClock className="size-4" />
          Jadwal servis
        </Link>
        <Link
          href="/vehicles"
          className={buttonVariants({
            variant: "outline",
            className: "h-auto w-full justify-start gap-3 py-3",
          })}
        >
          <Search className="size-4" />
          Cari kendaraan
        </Link>
        <Link
          href="/customers"
          className={buttonVariants({
            variant: "outline",
            className: "h-auto w-full justify-start gap-3 py-3",
          })}
        >
          <Trophy className="size-4" />
          Pelanggan
        </Link>
        {session.role === "owner" && (
          <Link
            href="/reports"
            className={buttonVariants({
              variant: "outline",
              className: "h-auto w-full justify-start gap-3 py-3",
            })}
          >
            <BarChart3 className="size-4" />
            Laporan analitik
          </Link>
        )}
        {session.role === "owner" && (
          <Link
            href="/finance"
            className={buttonVariants({
              variant: "outline",
              className: "h-auto w-full justify-start gap-3 py-3",
            })}
          >
            <LineChart className="size-4" />
            Laporan keuangan
          </Link>
        )}
      </div>
    </PageShell>
  );
}
