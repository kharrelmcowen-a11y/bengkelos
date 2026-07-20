"use client";

import { useState } from "react";
import { useActionState } from "react";
import { addTicketItem } from "../actions";

type InventoryOption = {
  id: string;
  name: string;
  unit: string;
  sell_price: number;
  stock_qty: number;
};

export function ItemForm({
  ticketId,
  inventoryItems,
}: {
  ticketId: string;
  inventoryItems: InventoryOption[];
}) {
  const [state, formAction, pending] = useActionState(addTicketItem, null);
  const [inventoryItemId, setInventoryItemId] = useState("");
  const [description, setDescription] = useState("");
  const [unitPrice, setUnitPrice] = useState("");

  function handleSelectInventory(id: string) {
    setInventoryItemId(id);
    const item = inventoryItems.find((i) => i.id === id);
    if (item) {
      setDescription(item.name);
      setUnitPrice(String(item.sell_price));
    }
  }

  return (
    <form action={formAction} className="mt-3 space-y-2">
      <input type="hidden" name="ticketId" value={ticketId} />
      <input type="hidden" name="inventoryItemId" value={inventoryItemId} />

      {inventoryItems.length > 0 && (
        <select
          value={inventoryItemId}
          onChange={(e) => handleSelectInventory(e.target.value)}
          className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm outline-none focus:border-neutral-500"
        >
          <option value="">Item bebas (bukan dari stok)</option>
          {inventoryItems.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name} — sisa {item.stock_qty} {item.unit}
            </option>
          ))}
        </select>
      )}

      <input
        name="description"
        placeholder="Deskripsi (ganti oli, servis rem, dll)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
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
          value={unitPrice}
          onChange={(e) => setUnitPrice(e.target.value)}
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
