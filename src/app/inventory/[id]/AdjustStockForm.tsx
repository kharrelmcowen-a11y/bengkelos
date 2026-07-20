"use client";

import { useActionState } from "react";
import { adjustStock } from "../actions";

export function AdjustStockForm({ itemId }: { itemId: string }) {
  const [state, formAction, pending] = useActionState(adjustStock, null);

  return (
    <form action={formAction} className="mt-3 space-y-2">
      <input type="hidden" name="itemId" value={itemId} />
      <div className="flex gap-2">
        <input
          name="changeQty"
          type="number"
          step="0.01"
          placeholder="+10 atau -2"
          required
          className="flex-1 rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm outline-none focus:border-neutral-500"
        />
        <select
          name="reason"
          defaultValue="purchase"
          className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm outline-none focus:border-neutral-500"
        >
          <option value="purchase">Pembelian</option>
          <option value="adjustment">Penyesuaian</option>
        </select>
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-neutral-800 px-4 py-2 text-sm text-white disabled:opacity-50"
        >
          {pending ? "..." : "Terapkan"}
        </button>
      </div>
      {state?.error && <p className="text-sm text-red-400">{state.error}</p>}
    </form>
  );
}
