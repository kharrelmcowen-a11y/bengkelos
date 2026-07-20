"use client";

import { useAction } from "next-safe-action/hooks";
import { createExpense } from "../actions";
import { firstActionError } from "@/lib/action-error";

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function NewExpensePage() {
  const { execute, isExecuting, result } = useAction(createExpense);
  const errorMessage = firstActionError(result);

  return (
    <main className="min-h-screen bg-neutral-950 p-6 text-white">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          execute({
            category: String(formData.get("category")) as
              | "rent"
              | "utilities"
              | "salary"
              | "supplies"
              | "other",
            description: String(formData.get("description") ?? ""),
            amount: Number(formData.get("amount")),
            spentAt: String(formData.get("spentAt") ?? ""),
          });
        }}
        className="mx-auto max-w-md space-y-4"
      >
        <h1 className="text-lg font-semibold">Catat pengeluaran</h1>

        <div>
          <label className="mb-1 block text-sm text-neutral-400">
            Kategori
          </label>
          <select
            name="category"
            defaultValue="supplies"
            className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 outline-none focus:border-neutral-500"
          >
            <option value="rent">Sewa</option>
            <option value="utilities">Listrik/air</option>
            <option value="salary">Gaji</option>
            <option value="supplies">Perlengkapan</option>
            <option value="other">Lainnya</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm text-neutral-400">
            Jumlah
          </label>
          <input
            name="amount"
            type="number"
            step="1"
            min="1"
            required
            className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 outline-none focus:border-neutral-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-neutral-400">
            Tanggal
          </label>
          <input
            name="spentAt"
            type="date"
            defaultValue={today()}
            required
            className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 outline-none focus:border-neutral-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-neutral-400">
            Catatan (opsional)
          </label>
          <input
            name="description"
            className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 outline-none focus:border-neutral-500"
          />
        </div>

        {errorMessage && <p className="text-sm text-red-400">{errorMessage}</p>}

        <button
          type="submit"
          disabled={isExecuting}
          className="w-full rounded-lg bg-white py-3 font-medium text-neutral-950 disabled:opacity-50"
        >
          {isExecuting ? "Menyimpan..." : "Simpan pengeluaran"}
        </button>
      </form>
    </main>
  );
}
