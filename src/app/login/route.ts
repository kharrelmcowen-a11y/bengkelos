import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sessionCookie } from "@/lib/session-token";
import { logAction, logDatabaseError } from "@/lib/logger";

// The shop runs one account with no PIN: the owner asked for a till anyone at
// the counter can pick up, and his father monitors the same screen. Visiting
// /login mints the session for that single staff row and moves on.
// ponytail: no credential at all, so anyone with the URL is inside. Put a
// password in front of the deployment if that stops being acceptable.
export async function GET(request: Request) {
  const supabase = createAdminClient();

  // Two rows, not one: the shop_id on the row picked here scopes every ticket,
  // payment and expense the till goes on to write, so a second active account
  // must stop the till rather than silently send the day's takings to another
  // shop's books.
  const { data: staff, error } = await supabase
    .from("staff")
    .select("id, shop_id, name, role")
    .eq("active", true)
    .order("created_at", { ascending: true })
    .limit(2);

  if (error) {
    logDatabaseError("login:staff", new Error(error.message));
    return NextResponse.json({ error: "Gagal baca data staff" }, { status: 500 });
  }

  if (!staff || staff.length === 0) {
    return NextResponse.json(
      { error: "Belum ada staff aktif di database" },
      { status: 500 },
    );
  }

  if (staff.length > 1) {
    logDatabaseError(
      "login:staff",
      new Error("more than one active staff row, refusing to guess the shop"),
    );
    return NextResponse.json(
      { error: "Ada lebih dari satu akun aktif — nonaktifkan yang tidak dipakai" },
      { status: 500 },
    );
  }

  const account = staff[0];
  const cookie = sessionCookie({
    staffId: account.id,
    shopId: account.shop_id,
    name: account.name,
    role: account.role,
  });

  logAction("login", { staffId: account.id, shopId: account.shop_id });

  // The cookie rides on this very response: one set through next/headers is
  // lost as soon as the handler returns a NextResponse of its own.
  const response = NextResponse.redirect(new URL("/dashboard", request.url));
  response.cookies.set(cookie.name, cookie.value, cookie.options);
  return response;
}
