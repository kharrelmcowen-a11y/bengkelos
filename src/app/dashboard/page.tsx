import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { logout, getDashboardMetrics } from "./actions";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatIDR } from "@/lib/format";
import { NotificationBell } from "@/components/notifications";
import { AnimatedButton } from "@/components/ui/animated-button";
import { ModernCard } from "@/components/ui/modern-card";
import { GradientBackground } from "@/components/ui/gradient-bg";
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
  Sparkles,
} from "lucide-react";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const metrics = await getDashboardMetrics();

  return (
    <PageShell>
      <GradientBackground />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold gradient-text">Halo, {session.name}</h1>
          <Badge variant="secondary" className="mt-2 capitalize">
            {session.role}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <NotificationBell />
          <form action={logout}>
            <Button type="submit" variant="ghost" size="sm" className="glow-hover">
              Keluar
            </Button>
          </form>
        </div>
      </div>

      {/* Dashboard Metrics */}
      {metrics && (
        <div className="mt-8 space-y-6">
          {/* Revenue Card */}
          <ModernCard gradient className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pendapatan hari ini</p>
                <p className="text-3xl font-bold gradient-text">{formatIDR(metrics.todayRevenue)}</p>
              </div>
              <div className="flex items-center gap-2 bg-background/50 backdrop-blur-sm px-3 py-1 rounded-full">
                {metrics.revenueChange >= 0 ? (
                  <TrendingUp className="size-5 text-green-500" />
                ) : (
                  <TrendingDown className="size-5 text-red-500" />
                )}
                <span className={`font-semibold ${metrics.revenueChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {Math.abs(metrics.revenueChange).toFixed(0)}%
                </span>
              </div>
            </div>
          </ModernCard>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <ModernCard className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Wrench className="size-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Tiket hari ini</p>
                  <p className="text-xl font-bold">{metrics.todayTickets}</p>
                </div>
              </div>
            </ModernCard>
            <ModernCard className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Users className="size-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Tiket aktif</p>
                  <p className="text-xl font-bold">{metrics.activeTickets}</p>
                </div>
              </div>
            </ModernCard>
          </div>

          {/* Low Stock Alert */}
          {metrics.lowStockItems.length > 0 && (
            <ModernCard className="p-4 border-destructive/50 bg-destructive/5 glow">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="size-5 text-destructive" />
                <p className="font-semibold text-destructive">Stok rendah</p>
              </div>
              <div className="space-y-2">
                {metrics.lowStockItems.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">{item.name}</span>
                    <Badge variant="destructive" className="text-xs">
                      {item.stock_qty} {item.reorder_point > 0 && `(min: ${item.reorder_point})`}
                    </Badge>
                  </div>
                ))}
              </div>
            </ModernCard>
          )}

          {/* Today's Appointments */}
          {metrics.todayAppointments.length > 0 && (
            <ModernCard className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <CalendarClock className="size-5 text-primary" />
                <p className="font-semibold">Jadwal hari ini</p>
              </div>
              <div className="space-y-2">
                {metrics.todayAppointments.slice(0, 3).map((apt) => (
                  <div key={apt.id} className="flex justify-between items-center text-sm p-2 bg-muted/30 rounded-lg">
                    <span className="font-medium">{apt.customer_name}</span>
                    <Badge variant="outline" className="text-xs">
                      {new Intl.DateTimeFormat("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                      }).format(new Date(apt.scheduled_at))}
                    </Badge>
                  </div>
                ))}
              </div>
            </ModernCard>
          )}
        </div>
      )}

      <div className="mt-8 space-y-3">
        <AnimatedButton 
          href="/tickets/new"
          className="w-full justify-start gap-3 py-4 h-auto text-base gradient-border"
        >
          <PlusCircle className="size-5" />
          Tiket servis baru
          <Sparkles className="size-4 ml-auto" />
        </AnimatedButton>
        
        <AnimatedButton 
          href="/tickets"
          variant="outline"
          className="w-full justify-start gap-3 py-4 h-auto text-base"
        >
          <Wrench className="size-5" />
          Lihat tiket aktif
        </AnimatedButton>
        
        <AnimatedButton 
          href="/inventory"
          variant="outline"
          className="w-full justify-start gap-3 py-4 h-auto text-base"
        >
          <Package className="size-5" />
          Stok barang
        </AnimatedButton>
        
        <AnimatedButton 
          href="/appointments"
          variant="outline"
          className="w-full justify-start gap-3 py-4 h-auto text-base"
        >
          <CalendarClock className="size-5" />
          Jadwal servis
        </AnimatedButton>
        
        <AnimatedButton 
          href="/vehicles"
          variant="outline"
          className="w-full justify-start gap-3 py-4 h-auto text-base"
        >
          <Search className="size-5" />
          Cari kendaraan
        </AnimatedButton>
        
        <AnimatedButton 
          href="/customers"
          variant="outline"
          className="w-full justify-start gap-3 py-4 h-auto text-base"
        >
          <Trophy className="size-5" />
          Pelanggan
        </AnimatedButton>
        
        {session.role === "owner" && (
          <AnimatedButton 
            href="/reports"
            variant="outline"
            className="w-full justify-start gap-3 py-4 h-auto text-base gradient-border"
          >
            <BarChart3 className="size-5" />
            Laporan analitik
            <Sparkles className="size-4 ml-auto" />
          </AnimatedButton>
        )}
        
        {session.role === "owner" && (
          <AnimatedButton 
            href="/finance"
            variant="outline"
            className="w-full justify-start gap-3 py-4 h-auto text-base"
          >
            <LineChart className="size-5" />
            Laporan keuangan
          </AnimatedButton>
        )}
      </div>
    </PageShell>
  );
}
