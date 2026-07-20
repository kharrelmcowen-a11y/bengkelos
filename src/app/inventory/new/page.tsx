"use client";

import { useActionState } from "react";
import { createInventoryItem } from "../actions";

export default function NewInventoryItemPage() {
  const [state, formAction, pending] = useActionState(
    createInventoryItem,
    null,
  );

  return (
    <main className="min-h-screen bg-neutral-950 p-6 text-white">
      <form action={formAction} className="mx-auto max-w-md space-y-4">
        <h1 className="text-lg font-semibold">Barang baru</h1>

        <div>
          <label className="mb-1 block text-sm text-neutral-400">
            Nama barang
          </label>
          <input
            name="name"
            required
            className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 outline-none focus:border-neutral-500"
          />
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <label className="mb-1 block text-sm text-neutral-400">
              SKU (opsional)
            </label>
            <input
              name="sku"
              className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 outline-none focus:border-neutral-500"
            />
          </div>
          <div className="w-24">
            <label className="mb-1 block text-sm text-neutral-400">
              Satuan
            </label>
            <input
              name="unit"
              defaultValue="pcs"
              className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 outline-none focus:border-neutral-500"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <label className="mb-1 block text-sm text-neutral-400">
              Harga modal
            </label>
            <input
              name="costPrice"
              type="number"
              step="1"
              min="0"
              defaultValue={0}
              required
              className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 outline-none focus:border-neutral-500"
            />
          </div>
          <div className="flex-1">
            <label className="mb-1 block text-sm text-neutral-400">
              Harga jual
            </label>
            <input
              name="sellPrice"
              type="number"
              step="1"
              min="0"
              defaultValue={0}
              required
              className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 outline-none focus:border-neutral-500"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <label className="mb-1 block text-sm text-neutral-400">
              Stok awal
            </label>
            <input
              name="stockQty"
              type="number"
              step="1"
              min="0"
              defaultValue={0}
              required
              className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 outline-none focus:border-neutral-500"
            />
          </div>
          <div className="flex-1">
            <label className="mb-1 block text-sm text-neutral-400">
              Titik reorder
            </label>
            <input
              name="reorderPoint"
              type="number"
              step="1"
              min="0"
              defaultValue={0}
              required
              className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 outline-none focus:border-neutral-500"
            />
          </div>
        </div>

        {state?.error && <p className="text-sm text-red-400">{state.error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-lg bg-white py-3 font-medium text-neutral-950 disabled:opacity-50"
        >
          {pending ? "Menyimpan..." : "Simpan barang"}
        </button>
      </form>
    </main>
  );
}
