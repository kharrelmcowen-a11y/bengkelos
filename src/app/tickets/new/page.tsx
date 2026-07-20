"use client";

import { useAction } from "next-safe-action/hooks";
import { createTicket } from "../actions";
import { firstActionError } from "@/lib/action-error";

export default function NewTicketPage() {
  const { execute, isExecuting, result } = useAction(createTicket);
  const errorMessage = firstActionError(result);

  return (
    <main className="min-h-screen bg-neutral-950 p-6 text-white">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          execute({
            customerName: String(formData.get("customerName") ?? ""),
            customerPhone: String(formData.get("customerPhone") ?? ""),
            plateNumber: String(formData.get("plateNumber") ?? ""),
            brand: String(formData.get("brand") ?? ""),
            model: String(formData.get("model") ?? ""),
            notes: String(formData.get("notes") ?? ""),
          });
        }}
        className="mx-auto max-w-md space-y-4"
      >
        <h1 className="text-lg font-semibold">Tiket servis baru</h1>

        <div>
          <label className="mb-1 block text-sm text-neutral-400">
            Nama customer
          </label>
          <input
            name="customerName"
            required
            className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 outline-none focus:border-neutral-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-neutral-400">
            No. HP customer (opsional)
          </label>
          <input
            name="customerPhone"
            className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 outline-none focus:border-neutral-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-neutral-400">
            Nomor plat
          </label>
          <input
            name="plateNumber"
            required
            className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 uppercase outline-none focus:border-neutral-500"
          />
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <label className="mb-1 block text-sm text-neutral-400">
              Merk (opsional)
            </label>
            <input
              name="brand"
              className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 outline-none focus:border-neutral-500"
            />
          </div>
          <div className="flex-1">
            <label className="mb-1 block text-sm text-neutral-400">
              Model (opsional)
            </label>
            <input
              name="model"
              className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 outline-none focus:border-neutral-500"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm text-neutral-400">
            Catatan (opsional)
          </label>
          <textarea
            name="notes"
            rows={3}
            className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 outline-none focus:border-neutral-500"
          />
        </div>

        {errorMessage && <p className="text-sm text-red-400">{errorMessage}</p>}

        <button
          type="submit"
          disabled={isExecuting}
          className="w-full rounded-lg bg-white py-3 font-medium text-neutral-950 disabled:opacity-50"
        >
          {isExecuting ? "Menyimpan..." : "Buat tiket"}
        </button>
      </form>
    </main>
  );
}
