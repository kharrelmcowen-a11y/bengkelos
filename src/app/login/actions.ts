"use server";

import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { createSession } from "@/lib/session";

export async function loginWithPin(
  _prevState: { error: string } | null,
  formData: FormData,
): Promise<{ error: string } | null> {
  const pin = String(formData.get("pin") ?? "").trim();

  if (!/^\d{4,6}$/.test(pin)) {
    return { error: "PIN harus 4-6 digit angka" };
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("staff")
    .select("id, shop_id, name, role")
    .eq("pin", pin)
    .eq("active", true);

  if (error || !data || data.length !== 1) {
    return { error: "PIN salah" };
  }

  const staff = data[0];
  await createSession({
    staffId: staff.id,
    shopId: staff.shop_id,
    name: staff.name,
    role: staff.role,
  });

  redirect("/dashboard");
}
