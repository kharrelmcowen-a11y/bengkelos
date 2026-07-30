import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();

  // Mark all notifications for this staff as read
  const { error } = await supabase
    .from("notifications")
    .update({ read_at: new Date().toISOString() })
    .eq("shop_id", session.shopId)
    .or(`staff_id.eq.${session.staffId},staff_id.is.null`)
    .is("read_at", null);

  if (error) {
    return NextResponse.json({ error: "Failed to mark all as read" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}