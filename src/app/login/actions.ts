"use server";

import { z } from "zod";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { actionClient } from "@/lib/safe-action";
import { sessionCookie, type Session } from "@/lib/session-token";
import { logAction, logDatabaseError } from "@/lib/logger";

const signInSchema = z.object({
  pin: z
    .string()
    .trim()
    .regex(/^\d{4,8}$/, "PIN harus 4-8 angka"),
});

/**
 * The throttle in verify_staff_pin counts failures per caller, and this is what
 * decides who a caller is. It is a hint, not an identity: the header can be
 * forged, so it slows a single attacker down rather than stopping a determined
 * one. Everything behind it still depends on the PIN being right.
 */
async function clientBucket(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
}

export const signIn = actionClient
  .inputSchema(signInSchema)
  .action(async ({ parsedInput }) => {
    const supabase = createAdminClient();

    const { data, error } = await supabase.rpc("verify_staff_pin", {
      p_pin: parsedInput.pin,
      p_client: await clientBucket(),
    });

    if (error) {
      logDatabaseError("login:verify_pin", new Error(error.message));
      throw new Error("Gagal memeriksa PIN");
    }

    const row = data?.[0];

    if (row?.locked) {
      throw new Error(
        "Terlalu banyak percobaan. Tunggu 15 menit sebelum mencoba lagi.",
      );
    }

    // Same message whether the PIN is wrong or no account carries it: telling
    // the difference apart is telling an attacker which half to keep guessing.
    if (!row?.staff_id) {
      logAction("login:rejected", {});
      throw new Error("PIN salah");
    }

    const session: Session = {
      staffId: row.staff_id,
      shopId: row.shop_id,
      name: row.staff_name,
      role: row.staff_role as Session["role"],
    };

    const cookie = sessionCookie(session);
    (await cookies()).set(cookie.name, cookie.value, cookie.options);

    logAction("login", { staffId: session.staffId, shopId: session.shopId });

    redirect("/dashboard");
  });
