"use client";

import { useActionState } from "react";
import { createExpense } from "../actions";

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function NewExpensePage() {
  const [state, formAction, pending] = useActionState(createExpense, null);

  return (
    <main className="min-h-screen bg-neutral-950 p-6 text-white">
      <form action={formAction} className="mx-auto max-w-md space-y-4">
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

        {state?.error && <p className="text-sm text-red-400">{state.error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-lg bg-white py-3 font-medium text-neutral-950 disabled:opacity-50"
        >
          {pending ? "Menyimpan..." : "Simpan pengeluaran"}
        </button>
      </form>
    </main>
  );
}
