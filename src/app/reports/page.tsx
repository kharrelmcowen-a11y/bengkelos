import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getReportData } from "./actions";
import { PageShell } from "@/components/page-shell";
import { PageHeader } from "@/components/page-header";
import { ModernCard } from "@/components/ui/modern-card";
import { GradientBackground } from "@/components/ui/gradient-bg";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatIDR } from "@/lib/format";
import { TrendingUp, Users, Package, Wrench, Trophy } from "lucide-react";

export default async function ReportsPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string }>;
}) {
  const { period = "7d" } = await searchParams;
  const session = await getSession();
  if (!session) redirect("/login");

  const reportData = await getReportData(period);

  if (!reportData) {
    return (
      <PageShell>
        <GradientBackground />
        <PageHeader
          title="Laporan Analitik"
          description="Insight mendalam tentang performa bengkel"
          backHref="/dashboard"
          backLabel="Dashboard"
        />
        <ModernCard className="p-6">
          <p className="text-center text-muted-foreground">Gagal memuat data laporan</p>
        </ModernCard>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <GradientBackground />
      <PageHeader
        title="Laporan Analitik"
        description="Insight mendalam tentang performa bengkel"
        backHref="/dashboard"
        backLabel="Dashboard"
      />

      {/* Period Selector */}
      <div className="flex gap-2 mb-6">
        <Link href="/reports?period=7d">
          <Button
            variant={period === "7d" ? "default" : "outline"}
            size="sm"
            className="flex-1 glow-hover"
          >
            7 Hari
          </Button>
        </Link>
        <Link href="/reports?period=30d">
          <Button
            variant={period === "30d" ? "default" : "outline"}
            size="sm"
            className="flex-1 glow-hover"
          >
            30 Hari
          </Button>
        </Link>
        <Link href="/reports?period=90d">
          <Button
            variant={period === "90d" ? "default" : "outline"}
            size="sm"
            className="flex-1 glow-hover"
          >
            90 Hari
          </Button>
        </Link>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <ModernCard className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <TrendingUp className="size-4 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">Total Pendapatan</p>
          </div>
          <p className="text-2xl font-bold gradient-text">{formatIDR(reportData.totalRevenue)}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {reportData.revenueGrowth >= 0 ? "+" : ""}
            {reportData.revenueGrowth.toFixed(1)}% vs periode sebelumnya
          </p>
        </ModernCard>

        <ModernCard className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Wrench className="size-4 text-accent" />
            </div>
            <p className="text-sm text-muted-foreground">Total Servis</p>
          </div>
          <p className="text-2xl font-bold">{reportData.totalTickets}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {reportData.ticketGrowth >= 0 ? "+" : ""}
            {reportData.ticketGrowth.toFixed(1)}% vs periode sebelumnya
          </p>
        </ModernCard>

        <ModernCard className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Users className="size-4 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">Pelanggan Unik</p>
          </div>
          <p className="text-2xl font-bold">{reportData.uniqueCustomers}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {reportData.customerGrowth >= 0 ? "+" : ""}
            {reportData.customerGrowth.toFixed(1)}% vs periode sebelumnya
          </p>
        </ModernCard>

        <ModernCard className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Package className="size-4 text-accent" />
            </div>
            <p className="text-sm text-muted-foreground">Rata-rata Transaksi</p>
          </div>
          <p className="text-2xl font-bold">{formatIDR(reportData.avgTransactionValue)}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {reportData.atvGrowth >= 0 ? "+" : ""}
            {reportData.atvGrowth.toFixed(1)}% vs periode sebelumnya
          </p>
        </ModernCard>
      </div>

      {/* Top Services */}
      <ModernCard className="p-5 mb-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Trophy className="size-5 text-primary" />
          Layanan Terpopuler
        </h3>
        <div className="space-y-3">
          {reportData.topServices.map((service, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-xs w-8 h-8 flex items-center justify-center">
                  #{index + 1}
                </Badge>
                <span className="text-sm font-medium">{service.description}</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">{service.count}x</p>
                <p className="text-xs text-muted-foreground">{formatIDR(service.revenue)}</p>
              </div>
            </div>
          ))}
        </div>
      </ModernCard>

      {/* Customer Insights */}
      <ModernCard className="p-5 mb-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Users className="size-5 text-primary" />
          Insight Pelanggan
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
            <span className="text-sm text-muted-foreground">Pelanggan berulang</span>
            <span className="text-sm font-semibold">{reportData.repeatCustomers}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
            <span className="text-sm text-muted-foreground">Tingkat retensi</span>
            <span className="text-sm font-semibold">{reportData.retentionRate.toFixed(1)}%</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
            <span className="text-sm text-muted-foreground">Nilai pelanggan seumur hidup</span>
            <span className="text-sm font-semibold gradient-text">{formatIDR(reportData.customerLifetimeValue)}</span>
          </div>
        </div>
      </ModernCard>

      {/* Inventory Performance */}
      <ModernCard className="p-5">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Package className="size-5 text-primary" />
          Performa Stok
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
            <span className="text-sm text-muted-foreground">Item terlaris</span>
            <span className="text-sm font-semibold">{reportData.topSellingItem}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
            <span className="text-sm text-muted-foreground">Nilai stok menipis</span>
            <span className="text-sm font-semibold">{formatIDR(reportData.lowStockValue)}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
            <span className="text-sm text-muted-foreground">Putaran stok</span>
            <span className="text-sm font-semibold">{reportData.stockTurnover.toFixed(2)}x</span>
          </div>
        </div>
      </ModernCard>
    </PageShell>
  );
}