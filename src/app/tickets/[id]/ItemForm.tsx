"use client";

import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { addTicketItem } from "../actions";
import { firstActionError } from "@/lib/action-error";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
          className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
        >
          <option value="">Item bebas (bukan dari stok)</option>
          {inventoryItems.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name} — sisa {item.stock_qty} {item.unit}
            </option>
          ))}
        </select>
      )}

      <Input
        name="description"
        placeholder="Deskripsi (ganti oli, servis rem, dll)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <div className="flex gap-2">
        <Input
          name="quantity"
          type="number"
          step="0.01"
          min="0.01"
          defaultValue={1}
          required
          className="w-24"
        />
        <Input
          name="unitPrice"
          type="number"
          step="1"
          min="0"
          placeholder="Harga satuan"
          value={unitPrice}
          onChange={(e) => setUnitPrice(e.target.value)}
          required
          className="flex-1"
        />
        <Button type="submit" variant="secondary" disabled={isExecuting}>
          {isExecuting ? "..." : "Tambah"}
        </Button>
      </div>
      {errorMessage && (
        <Alert variant="destructive">
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
    </form>
  );
}
