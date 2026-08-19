"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { authActionClient } from "@/lib/safe-action";

const createExpenseSchema = z.object({
  category: z.enum(["rent", "utilities", "salary", "supplies", "other"], {
    error: "Kategori tidak valid",
  }),
  description: z.string().trim().optional().default(""),
  amount: z.coerce.number().positive("Jumlah tidak valid"),
  spentAt: z.string().min(1, "Tanggal wajib diisi"),
});

export const createExpense = authActionClient
  .inputSchema(createExpenseSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { session } = ctx;
    const supabase = createAdminClient();

    const { error } = await supabase.from("expenses").insert({
      shop_id: session.shopId,
      staff_id: session.staffId,
      category: parsedInput.category,
      description: parsedInput.description || null,
      amount: parsedInput.amount,
      spent_at: parsedInput.spentAt,
    });

    if (error) throw new Error("Gagal simpan pengeluaran");

    redirect("/expenses");
  });
