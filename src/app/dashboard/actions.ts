"use server";

import { redirect } from "next/navigation";
import { destroySession } from "@/lib/session";
import { getSession } from "@/lib/session";
import { createAdminClient } from "@/lib/supabase/admin";
import { logDatabaseError } from "@/lib/logger";
import { pickLowStock } from "@/lib/inventory";

export async function logout() {
  await destroySession();
  redirect("/login");
}

type QueryResult<T> = { data: T[] | null; error: { message: string } | null };

// A failed dashboard query used to fall through as an empty array, which reads
// on screen as a real zero. Log it instead so a broken query is visible.
function rows<T>(result: QueryResult<T>, query: string, shopId: string): T[] {
  if (result.error) {
    logDatabaseError(query, new Error(result.error.message), { shopId });
    return [];
  }
  return result.data ?? [];
}

type InventoryRow = {
  id: string;
  name: string;
  stock_qty: number;
  reorder_point: number;
};

export async function getDashboardMetrics() {
  const session = await getSession();
  if (!session) return null;

  const supabase = createAdminClient();
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfYesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
  const endOfYesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const [
    todayTickets,
    yesterdayTickets,
    activeTickets,
    inventory,
    todayAppointments,
    todayPayments,
    yesterdayPayments,
  ] = await Promise.all([
    // Today's completed tickets — by completion time only; a ticket opened
    // yesterday and finished today still counts as today's work.
    supabase
      .from("service_tickets")
      .select("id")
      .eq("shop_id", session.shopId)
      .eq("status", "completed")
      .gte("completed_at", startOfDay.toISOString()),

    // Yesterday's completed tickets (for comparison)
    supabase
      .from("service_tickets")
      .select("id")
      .eq("shop_id", session.shopId)
      .eq("status", "completed")
      .gte("completed_at", startOfYesterday.toISOString())
      .lt("completed_at", endOfYesterday.toISOString()),

    // Active tickets (open + in_progress)
    supabase
      .from("service_tickets")
      .select("id")
      .eq("shop_id", session.shopId)
      .in("status", ["open", "in_progress"]),

    // Low stock items — PostgREST cannot compare two columns in a filter, so
    // the shop's catalog is compared in JS.
    // ponytail: reads the whole catalog; move to a view or RPC if a shop ever
    // carries more parts than one response should hold.
    supabase
      .from("inventory_items")
      .select("id, name, stock_qty, reorder_point")
      .eq("shop_id", session.shopId),

    // Today's appointments
    supabase
      .from("appointments")
      .select("id, customer_name, scheduled_at")
      .eq("shop_id", session.shopId)
      .eq("status", "scheduled")
      .gte("scheduled_at", startOfDay.toISOString())
      .order("scheduled_at", { ascending: true })
      .limit(5),

    // Today's revenue
    supabase
      .from("payments")
      .select("amount")
      .eq("shop_id", session.shopId)
      .gte("paid_at", startOfDay.toISOString()),

    // Yesterday's revenue (for comparison)
    supabase
      .from("payments")
      .select("amount")
      .eq("shop_id", session.shopId)
      .gte("paid_at", startOfYesterday.toISOString())
      .lt("paid_at", endOfYesterday.toISOString()),
  ]);

  const shopId = session.shopId;
  const todayPaymentRows = rows<{ amount: number }>(todayPayments, "payments:today", shopId);
  const yesterdayPaymentRows = rows<{ amount: number }>(
    yesterdayPayments,
    "payments:yesterday",
    shopId,
  );

  const todayRevenue = todayPaymentRows.reduce((sum, p) => sum + Number(p.amount), 0);
  const yesterdayRevenue = yesterdayPaymentRows.reduce((sum, p) => sum + Number(p.amount), 0);
  const revenueChange = yesterdayRevenue > 0
    ? ((todayRevenue - yesterdayRevenue) / yesterdayRevenue) * 100
    : 0;

  const lowStockItems = pickLowStock(
    rows<InventoryRow>(inventory, "inventory_items:low_stock", shopId),
  );

  return {
    todayTickets: rows(todayTickets, "service_tickets:today", shopId).length,
    yesterdayTickets: rows(yesterdayTickets, "service_tickets:yesterday", shopId).length,
    activeTickets: rows(activeTickets, "service_tickets:active", shopId).length,
    lowStockItems,
    todayAppointments: rows<{ id: string; customer_name: string; scheduled_at: string }>(
      todayAppointments,
      "appointments:today",
      shopId,
    ),
    todayRevenue,
    yesterdayRevenue,
    revenueChange,
  };
}
