import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();

  // Get notifications for this shop and staff
  const { data: notifications } = await supabase
    .from("notifications")
    .select("*")
    .eq("shop_id", session.shopId)
    .or(`staff_id.eq.${session.staffId},staff_id.is.null`)
    .order("created_at", { ascending: false })
    .limit(20);

  // Count unread notifications
  const { count } = await supabase
    .from("notifications")
    .select("*", { count: "exact", head: true })
    .eq("shop_id", session.shopId)
    .or(`staff_id.eq.${session.staffId},staff_id.is.null`)
    .is("read_at", null);

  return NextResponse.json({
    notifications: notifications || [],
    unreadCount: count || 0,
  });
}