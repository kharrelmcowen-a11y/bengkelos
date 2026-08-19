"use server";

import { getSession } from "@/lib/session";
import { createAdminClient } from "@/lib/supabase/admin";
import { cogsFromMovements, pickLowStock, stockValue } from "@/lib/inventory";
import { rows } from "@/lib/query";
import {
  busiestItemId,
  countUnique,
  growthPercent,
  sumAmounts,
  topServices,
} from "@/lib/reports";

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
    currentPeriodPaymentsResult,
    previousPeriodPaymentsResult,
    currentPeriodTicketsResult,
    previousPeriodTicketsResult,
    currentPeriodCustomersResult,
    previousPeriodCustomersResult,
    ticketItemsResult,
    allCustomersResult,
    stockMovementsResult,
    inventoryItemsResult,
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
      .select("id, name, cost_price, sell_price, stock_qty, reorder_point")
      .eq("shop_id", session.shopId),
  ]);

  const shopId = session.shopId;
  const currentPeriodPayments = rows<{ amount: number }>(currentPeriodPaymentsResult, "payments:current", shopId);
  const previousPeriodPayments = rows<{ amount: number }>(previousPeriodPaymentsResult, "payments:previous", shopId);
  const currentPeriodTickets = rows<{ id: string; customer_id: string; created_at: string }>(currentPeriodTicketsResult, "service_tickets:current", shopId);
  const previousPeriodTickets = rows<{ id: string; customer_id: string }>(previousPeriodTicketsResult, "service_tickets:previous", shopId);
  const currentPeriodCustomers = rows<{ customer_id: string }>(currentPeriodCustomersResult, "service_tickets:customers_current", shopId);
  const previousPeriodCustomers = rows<{ customer_id: string }>(previousPeriodCustomersResult, "service_tickets:customers_previous", shopId);
  const ticketItems = rows<{ description: string; quantity: number; unit_price: number; ticket_id: string }>(ticketItemsResult, "ticket_items:current", shopId);
  const allCustomers = rows<{ id: string; total_visits: number; total_spent: number }>(allCustomersResult, "customers:all", shopId);
  const stockMovements = rows<{ inventory_item_id: string | null; change_qty: number; reason: string; created_at: string }>(stockMovementsResult, "stock_movements:current", shopId);
  const inventoryItems = rows<{ id: string; name: string; cost_price: number; sell_price: number; stock_qty: number; reorder_point: number }>(inventoryItemsResult, "inventory_items:all", shopId);

  // Calculate revenue metrics
  const currentRevenue = sumAmounts(currentPeriodPayments);
  const previousRevenue = sumAmounts(previousPeriodPayments);
  const revenueGrowth = growthPercent(currentRevenue, previousRevenue);

  // Calculate ticket metrics
  const currentTickets = currentPeriodTickets;
  const previousTickets = previousPeriodTickets;
  const ticketGrowth = growthPercent(currentTickets.length, previousTickets.length);

  // Calculate customer metrics
  const currentCustomerCount = countUnique(currentPeriodCustomers, (c) => c.customer_id);
  const previousCustomerCount = countUnique(previousPeriodCustomers, (c) => c.customer_id);
  const customerGrowth = growthPercent(currentCustomerCount, previousCustomerCount);

  // Calculate average transaction value
  const avgTransactionValue = currentTickets.length > 0 ? currentRevenue / currentTickets.length : 0;
  const previousATV = previousTickets.length > 0 ? previousRevenue / previousTickets.length : 0;
  const atvGrowth = growthPercent(avgTransactionValue, previousATV);

  const services = topServices(ticketItems);

  // Customer insights
  const customers = allCustomers;
  const repeatCustomers = customers.filter(c => c.total_visits > 1).length;
  const retentionRate = customers.length > 0 ? (repeatCustomers / customers.length) * 100 : 0;
  const customerLifetimeValue = customers.length > 0 
    ? customers.reduce((sum, c) => sum + (c.total_spent || 0), 0) / customers.length 
    : 0;

  // Inventory performance
  const items = inventoryItems;
  const busiestId = busiestItemId(stockMovements);
  const topSellingItem = items.find((i) => i.id === busiestId)?.name || "N/A";

  // 'out_of_stock' is not an allowed stock_movements reason, so the old stockout
  // metric always read zero. Report the capital tied up in low stock instead.
  const lowStockValue = stockValue(pickLowStock(items, items.length));

  const totalStockValue = stockValue(items);
  const periodCogs = cogsFromMovements(stockMovements, items);
  const stockTurnover = totalStockValue > 0 ? periodCogs / totalStockValue : 0;

  return {
    totalRevenue: currentRevenue,
    revenueGrowth,
    totalTickets: currentTickets.length,
    ticketGrowth,
    uniqueCustomers: currentCustomerCount,
    customerGrowth,
    avgTransactionValue,
    atvGrowth,
    topServices: services,
    repeatCustomers,
    retentionRate,
    customerLifetimeValue,
    topSellingItem,
    lowStockValue,
    stockTurnover,
  };
}