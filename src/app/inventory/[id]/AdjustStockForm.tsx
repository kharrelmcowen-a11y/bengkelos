"use client";

import { useAction } from "next-safe-action/hooks";
import { adjustStock } from "../actions";
import { firstActionError } from "@/lib/action-error";

export function AdjustStockForm({ itemId }: { itemId: string }) {
  const { execute, isExecuting, result } = useAction(adjustStock);
  const errorMessage = firstActionError(result);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        execute({
          itemId,
          changeQty: Number(formData.get("changeQty")),
          reason: String(formData.get("reason")) as
            | "purchase"
            | "adjustment",
        });
      }}
      className="mt-3 space-y-2"
    >
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
          disabled={isExecuting}
          className="rounded-lg bg-neutral-800 px-4 py-2 text-sm text-white disabled:opacity-50"
        >
          {isExecuting ? "..." : "Terapkan"}
        </button>
      </div>
      {errorMessage && <p className="text-sm text-red-400">{errorMessage}</p>}
    </form>
  );
}
