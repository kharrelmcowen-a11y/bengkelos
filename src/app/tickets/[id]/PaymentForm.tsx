"use client";

import { useActionState } from "react";
import { addPayment } from "../actions";

export function PaymentForm({ ticketId }: { ticketId: string }) {
  const [state, formAction, pending] = useActionState(addPayment, null);

  return (
    <form action={formAction} className="mt-3 space-y-2">
      <input type="hidden" name="ticketId" value={ticketId} />
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
          disabled={pending}
          className="rounded-lg bg-neutral-800 px-4 py-2 text-sm text-white disabled:opacity-50"
        >
          {pending ? "..." : "Bayar"}
        </button>
      </div>
      {state?.error && <p className="text-sm text-red-400">{state.error}</p>}
    </form>
  );
}
