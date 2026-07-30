"use server";

import { redirect } from "next/navigation";
import { destroySession } from "@/lib/session";
import { getSession } from "@/lib/session";
import { createAdminClient } from "@/lib/supabase/admin";

export async function logout() {
  await destroySession();
  redirect("/login");
}

export async function getDashboardMetrics() {
  const session = await getSession();
  if (!session) return null;

  const supabase = createAdminClient();
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfYesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
  const endOfYesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const [
    { data: todayTickets },
    { data: yesterdayTickets },
    { data: activeTickets },
    { data: lowStockItems },
    { data: todayAppointments },
    { data: todayPayments },
    { data: yesterdayPayments },
  ] = await Promise.all([
    // Today's completed tickets
    supabase
      .from("service_tickets")
      .select("id")
      .eq("shop_id", session.shopId)
      .eq("status", "completed")
      .gte("completed_at", startOfDay.toISOString())
      .gte("created_at", startOfDay.toISOString()),

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

    // Low stock items
    supabase
      .from("inventory_items")
      .select("id, name, stock_qty, reorder_point")
      .eq("shop_id", session.shopId)
      .lte("stock_qty", "reorder_point")
      .order("stock_qty", { ascending: true })
      .limit(5),

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

  const todayRevenue = (todayPayments ?? []).reduce((sum, p) => sum + Number(p.amount), 0);
  const yesterdayRevenue = (yesterdayPayments ?? []).reduce((sum, p) => sum + Number(p.amount), 0);
  const revenueChange = yesterdayRevenue > 0 
    ? ((todayRevenue - yesterdayRevenue) / yesterdayRevenue) * 100 
    : 0;

  return {
    todayTickets: (todayTickets ?? []).length,
    yesterdayTickets: (yesterdayTickets ?? []).length,
    activeTickets: (activeTickets ?? []).length,
    lowStockItems: lowStockItems ?? [],
    todayAppointments: todayAppointments ?? [],
    todayRevenue,
    yesterdayRevenue,
    revenueChange,
  };
}
