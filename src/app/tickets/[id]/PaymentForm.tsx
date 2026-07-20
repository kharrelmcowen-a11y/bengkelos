"use client";

import { useAction } from "next-safe-action/hooks";
import { addPayment } from "../actions";
import { firstActionError } from "@/lib/action-error";

export function PaymentForm({ ticketId }: { ticketId: string }) {
  const { execute, isExecuting, result } = useAction(addPayment);
  const errorMessage = firstActionError(result);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        execute({
          ticketId,
          amount: Number(formData.get("amount")),
          method: String(formData.get("method")) as
            | "cash"
            | "transfer"
            | "qris"
            | "card",
        });
      }}
      className="mt-3 space-y-2"
    >
      <div className="flex gap-2">
        <input
          name="amount"
          type="number"
          step="1"
          min="1"
          placeholder="Jumlah bayar"
          required
          className="flex-1 rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm outline-none focus:border-neutral-500"
        />
        <select
          name="method"
          defaultValue="cash"
          className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm outline-none focus:border-neutral-500"
        >
          <option value="cash">Tunai</option>
          <option value="transfer">Transfer</option>
          <option value="qris">QRIS</option>
          <option value="card">Kartu</option>
        </select>
        <button
          type="submit"
          disabled={isExecuting}
          className="rounded-lg bg-neutral-800 px-4 py-2 text-sm text-white disabled:opacity-50"
        >
          {isExecuting ? "..." : "Bayar"}
        </button>
      </div>
      {errorMessage && <p className="text-sm text-red-400">{errorMessage}</p>}
    </form>
  );
}
