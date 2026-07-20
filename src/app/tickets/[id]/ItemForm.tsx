"use client";

import { useActionState } from "react";
import { addTicketItem } from "../actions";

export function ItemForm({ ticketId }: { ticketId: string }) {
  const [state, formAction, pending] = useActionState(addTicketItem, null);

  return (
    <form action={formAction} className="mt-3 space-y-2">
      <input type="hidden" name="ticketId" value={ticketId} />
      <input
        name="description"
        placeholder="Deskripsi (ganti oli, servis rem, dll)"
        required
        className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm outline-none focus:border-neutral-500"
      />
      <div className="flex gap-2">
        <input
          name="quantity"
          type="number"
          step="0.01"
          min="0.01"
          defaultValue={1}
          required
          className="w-24 rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm outline-none focus:border-neutral-500"
        />
        <input
          name="unitPrice"
          type="number"
          step="1"
          min="0"
          placeholder="Harga satuan"
          required
          className="flex-1 rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm outline-none focus:border-neutral-500"
        />
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-neutral-800 px-4 py-2 text-sm text-white disabled:opacity-50"
        >
          {pending ? "..." : "Tambah"}
        </button>
      </div>
      {state?.error && <p className="text-sm text-red-400">{state.error}</p>}
    </form>
  );
}
