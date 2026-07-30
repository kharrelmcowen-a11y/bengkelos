import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getReportData } from "./actions";
import { PageShell } from "@/components/page-shell";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatIDR } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, Users, Package, Wrench, Calendar } from "lucide-react";

export default async function ReportsPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string }>;
}) {
  const { period = "7d" } = await searchParams;
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role !== "owner") redirect("/dashboard");

  const reportData = await getReportData(period);

  return (
    <PageShell>
      <PageHeader
        title="Laporan Analitik"
        description="Insight mendalam tentang performa bengkel"
        backHref="/dashboard"
        backLabel="Dashboard"
      />

      {/* Period Selector */}
      <div className="flex gap-2 mb-6">
        <Button
          variant={period === "7d" ? "default" : "outline"}
          size="sm"
          asChild
        >
          <Link href="/reports?period=7d">7 Hari</Link>
        </Button>
        <Button
          variant={period === "30d" ? "default" : "outline"}
          size="sm"
          asChild
        >
          <Link href="/reports?period=30d">30 Hari</Link>
        </Button>
        <Button
          variant={period === "90d" ? "default" : "outline"}
          size="sm"
          asChild
        >
          <Link href="/reports?period=90d">90 Hari</Link>
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="size-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Total Pendapatan</p>
          </div>
          <p className="text-2xl font-semibold">{formatIDR(reportData.totalRevenue)}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {reportData.revenueGrowth >= 0 ? "+" : ""}
            {reportData.revenueGrowth.toFixed(1)}% vs periode sebelumnya
          </p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Wrench className="size-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Total Servis</p>
          </div>
          <p className="text-2xl font-semibold">{reportData.totalTickets}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {reportData.ticketGrowth >= 0 ? "+" : ""}
            {reportData.ticketGrowth.toFixed(1)}% vs periode sebelumnya
          </p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="size-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Pelanggan Unik</p>
          </div>
          <p className="text-2xl font-semibold">{reportData.uniqueCustomers}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {reportData.customerGrowth >= 0 ? "+" : ""}
            {reportData.customerGrowth.toFixed(1)}% vs periode sebelumnya
          </p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Package className="size-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Rata-rata Transaksi</p>
          </div>
          <p className="text-2xl font-semibold">{formatIDR(reportData.avgTransactionValue)}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {reportData.atvGrowth >= 0 ? "+" : ""}
            {reportData.atvGrowth.toFixed(1)}% vs periode sebelumnya
          </p>
        </Card>
      </div>

      {/* Top Services */}
      <Card className="p-4 mb-6">
        <h3 className="font-medium mb-3">Layanan Terpopuler</h3>
        <div className="space-y-2">
          {reportData.topServices.map((service, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  #{index + 1}
                </Badge>
                <span className="text-sm">{service.description}</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{service.count}x</p>
                <p className="text-xs text-muted-foreground">{formatIDR(service.revenue)}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Customer Insights */}
      <Card className="p-4 mb-6">
        <h3 className="font-medium mb-3">Insight Pelanggan</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Pelanggan berulang</span>
            <span className="text-sm font-medium">{reportData.repeatCustomers}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Tingkat retensi</span>
            <span className="text-sm font-medium">{reportData.retentionRate.toFixed(1)}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Nilai pelanggan seumur hidup</span>
            <span className="text-sm font-medium">{formatIDR(reportData.customerLifetimeValue)}</span>
          </div>
        </div>
      </Card>

      {/* Inventory Performance */}
      <Card className="p-4">
        <h3 className="font-medium mb-3">Performa Stok</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Item terlaris</span>
            <span className="text-sm font-medium">{reportData.topSellingItem}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Nilai stok habis</span>
            <span className="text-sm font-medium">{formatIDR(reportData.stockoutValue)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Putaran stok</span>
            <span className="text-sm font-medium">{reportData.stockTurnover.toFixed(2)}x</span>
          </div>
        </div>
      </Card>
    </PageShell>
  );
}