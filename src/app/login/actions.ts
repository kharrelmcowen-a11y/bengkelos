"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { actionClient } from "@/lib/safe-action";
import { createAdminClient } from "@/lib/supabase/admin";
import { createSession } from "@/lib/session";

const schema = z.object({
  pin: z.string().regex(/^\d{4,6}$/, "PIN harus 4-6 digit angka"),
});

export const loginWithPin = actionClient
  .inputSchema(schema)
  .action(async ({ parsedInput }) => {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("staff")
      .select("id, shop_id, name, role")
      .eq("pin", parsedInput.pin)
      .eq("active", true);

    if (error || !data || data.length !== 1) throw new Error("PIN salah");

    const staff = data[0];
    await createSession({
      staffId: staff.id,
      shopId: staff.shop_id,
      name: staff.name,
      role: staff.role,
    });

    redirect("/dashboard");
  });
