"use client";

import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { addTicketItem } from "../actions";
import { firstActionError } from "@/lib/action-error";

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
  const { execute, isExecuting, result } = useAction(addTicketItem);
  const errorMessage = firstActionError(result);
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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        execute({
          ticketId,
          inventoryItemId,
          description,
          quantity: Number(formData.get("quantity")),
          unitPrice: Number(unitPrice),
        });
      }}
      className="mt-3 space-y-2"
    >
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
          disabled={isExecuting}
          className="rounded-lg bg-neutral-800 px-4 py-2 text-sm text-white disabled:opacity-50"
        >
          {isExecuting ? "..." : "Tambah"}
        </button>
      </div>
      {errorMessage && <p className="text-sm text-red-400">{errorMessage}</p>}
    </form>
  );
}
