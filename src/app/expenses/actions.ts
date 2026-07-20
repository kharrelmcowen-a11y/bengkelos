"use server";

import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { getSession } from "@/lib/session";

type ActionState = { error: string } | null;

const CATEGORIES = ["rent", "utilities", "salary", "supplies", "other"];

export async function createExpense(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role !== "owner") return { error: "Hanya owner yang bisa akses" };

  const category = String(formData.get("category") ?? "");
  const description = String(formData.get("description") ?? "").trim();
  const amount = Number(formData.get("amount"));
  const spentAt = String(formData.get("spentAt") ?? "");

  if (!CATEGORIES.includes(category)) return { error: "Kategori tidak valid" };
  if (!Number.isFinite(amount) || amount <= 0)
    return { error: "Jumlah tidak valid" };
  if (!spentAt) return { error: "Tanggal wajib diisi" };

  const supabase = createAdminClient();

  const { error } = await supabase.from("expenses").insert({
    shop_id: session.shopId,
    staff_id: session.staffId,
    category,
    description: description || null,
    amount,
    spent_at: spentAt,
  });

  if (error) return { error: "Gagal simpan pengeluaran" };

  redirect("/expenses");
}
