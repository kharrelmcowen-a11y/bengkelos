"use server";

import { getSession } from "@/lib/session";
import { createAdminClient } from "@/lib/supabase/admin";

export async function getReportData(period: string) {
  const session = await getSession();
  if (!session) return null;

  const supabase = createAdminClient();
  const now = new Date();
  
  // Calculate date ranges based on period
  let startDate: Date;
  let previousStartDate: Date;
  
  switch (period) {
    case "7d":
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      previousStartDate = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
      break;
    case "30d":
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      previousStartDate = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
      break;
    case "90d":
      startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
      previousStartDate = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
      break;
    default:
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      previousStartDate = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
  }

  const [
    { data: currentPeriodPayments },
    { data: previousPeriodPayments },
    { data: currentPeriodTickets },
    { data: previousPeriodTickets },
    { data: currentPeriodCustomers },
    { data: previousPeriodCustomers },
    { data: ticketItems },
    { data: allCustomers },
    { data: stockMovements },
    { data: inventoryItems },
  ] = await Promise.all([
    // Current period revenue
    supabase
      .from("payments")
      .select("amount")
      .eq("shop_id", session.shopId)
      .gte("paid_at", startDate.toISOString()),

    // Previous period revenue
    supabase
      .from("payments")
      .select("amount")
      .eq("shop_id", session.shopId)
      .gte("paid_at", previousStartDate.toISOString())
      .lt("paid_at", startDate.toISOString()),

    // Current period tickets
    supabase
      .from("service_tickets")
      .select("id, customer_id, created_at")
      .eq("shop_id", session.shopId)
      .gte("created_at", startDate.toISOString()),

    // Previous period tickets
    supabase
      .from("service_tickets")
      .select("id, customer_id")
      .eq("shop_id", session.shopId)
      .gte("created_at", previousStartDate.toISOString())
      .lt("created_at", startDate.toISOString()),

    // Current period unique customers
    supabase
      .from("service_tickets")
      .select("customer_id")
      .eq("shop_id", session.shopId)
      .gte("created_at", startDate.toISOString()),

    // Previous period unique customers
    supabase
      .from("service_tickets")
      .select("customer_id")
      .eq("shop_id", session.shopId)
      .gte("created_at", previousStartDate.toISOString())
      .lt("created_at", startDate.toISOString()),

    // Ticket items for service analysis
    supabase
      .from("ticket_items")
      .select("description, quantity, unit_price, ticket_id")
      .eq("shop_id", session.shopId)
      .gte("created_at", startDate.toISOString()),

    // All customers for loyalty analysis
    supabase
      .from("customers")
      .select("id, total_visits, total_spent")
      .eq("shop_id", session.shopId),

    // Stock movements for inventory analysis
    supabase
      .from("stock_movements")
      .select("inventory_item_id, change_qty, reason, created_at")
      .eq("shop_id", session.shopId)
      .gte("created_at", startDate.toISOString()),

    // Inventory items
    supabase
      .from("inventory_items")
      .select("id, name, cost_price, sell_price, stock_qty")
      .eq("shop_id", session.shopId),
  ]);

  // Calculate revenue metrics
  const currentRevenue = (currentPeriodPayments ?? []).reduce((sum, p) => sum + Number(p.amount), 0);
  const previousRevenue = (previousPeriodPayments ?? []).reduce((sum, p) => sum + Number(p.amount), 0);
  const revenueGrowth = previousRevenue > 0 ? ((currentRevenue - previousRevenue) / previousRevenue) * 100 : 0;

  // Calculate ticket metrics
  const currentTickets = currentPeriodTickets ?? [];
  const previousTickets = previousPeriodTickets ?? [];
  const ticketGrowth = previousTickets.length > 0 ? ((currentTickets.length - previousTickets.length) / previousTickets.length) * 100 : 0;

  // Calculate customer metrics
  const currentCustomers = new Set((currentPeriodCustomers ?? []).map(c => c.customer_id));
  const previousCustomers = new Set((previousPeriodCustomers ?? []).map(c => c.customer_id));
  const customerGrowth = previousCustomers.size > 0 ? ((currentCustomers.size - previousCustomers.size) / previousCustomers.size) * 100 : 0;

  // Calculate average transaction value
  const avgTransactionValue = currentTickets.length > 0 ? currentRevenue / currentTickets.length : 0;
  const previousATV = previousTickets.length > 0 ? previousRevenue / previousTickets.length : 0;
  const atvGrowth = previousATV > 0 ? ((avgTransactionValue - previousATV) / previousATV) * 100 : 0;

  // Analyze top services
  const serviceMap = new Map<string, { count: number; revenue: number }>();
  (ticketItems ?? []).forEach(item => {
    const existing = serviceMap.get(item.description) || { count: 0, revenue: 0 };
    serviceMap.set(item.description, {
      count: existing.count + item.quantity,
      revenue: existing.revenue + (item.quantity * item.unit_price),
    });
  });

  const topServices = Array.from(serviceMap.entries())
    .map(([description, data]) => ({ description, ...data }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Customer insights
  const customers = allCustomers ?? [];
  const repeatCustomers = customers.filter(c => c.total_visits > 1).length;
  const retentionRate = customers.length > 0 ? (repeatCustomers / customers.length) * 100 : 0;
  const customerLifetimeValue = customers.length > 0 
    ? customers.reduce((sum, c) => sum + (c.total_spent || 0), 0) / customers.length 
    : 0;

  // Inventory performance
  const itemMovements = new Map<string, number>();
  (stockMovements ?? []).forEach(movement => {
    if (movement.inventory_item_id) {
      const existing = itemMovements.get(movement.inventory_item_id) || 0;
      itemMovements.set(movement.inventory_item_id, existing + Math.abs(movement.change_qty));
    }
  });

  const items = inventoryItems ?? [];
  const topSellingItemId = Array.from(itemMovements.entries())
    .sort((a, b) => b[1] - a[1])[0]?.[0];
  const topSellingItem = items.find(i => i.id === topSellingItemId)?.name || "N/A";

  const stockoutValue = (stockMovements ?? [])
    .filter(m => m.reason === "out_of_stock")
    .reduce((sum, m) => {
      const item = items.find(i => i.id === m.inventory_item_id);
      return sum + (item?.sell_price || 0);
    }, 0);

  const totalStockValue = items.reduce((sum, i) => sum + (i.cost_price * i.stock_qty), 0);
  const totalStockSold = (stockMovements ?? [])
    .filter(m => m.reason === "ticket_deduct")
    .reduce((sum, m) => Math.abs(m.change_qty), 0);
  const stockTurnover = totalStockValue > 0 ? (totalStockSold * 100) / totalStockValue : 0;

  return {
    totalRevenue: currentRevenue,
    revenueGrowth,
    totalTickets: currentTickets.length,
    ticketGrowth,
    uniqueCustomers: currentCustomers.size,
    customerGrowth,
    avgTransactionValue,
    atvGrowth,
    topServices,
    repeatCustomers,
    retentionRate,
    customerLifetimeValue,
    topSellingItem,
    stockoutValue,
    stockTurnover,
  };
}