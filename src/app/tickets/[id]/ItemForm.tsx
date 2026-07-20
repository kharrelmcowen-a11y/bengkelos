"use client";

import { useState, type KeyboardEvent } from "react";
import { useAction } from "next-safe-action/hooks";
import { addTicketItem } from "../actions";
import { firstActionError } from "@/lib/action-error";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScanLine } from "lucide-react";

type InventoryOption = {
  id: string;
  name: string;
  sku: string | null;
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
  const [scanCode, setScanCode] = useState("");
  const [scanError, setScanError] = useState("");

  function handleSelectInventory(id: string) {
    setInventoryItemId(id);
    const item = inventoryItems.find((i) => i.id === id);
    if (item) {
      setDescription(item.name);
      setUnitPrice(String(item.sell_price));
    }
  }

  function handleScan(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const code = scanCode.trim();
    setScanCode("");
    if (!code) return;

    const item = inventoryItems.find(
      (i) => i.sku && i.sku.toLowerCase() === code.toLowerCase(),
    );
    if (!item) {
      setScanError(`SKU "${code}" tidak ditemukan di stok`);
      return;
    }
    setScanError("");
    execute({
      ticketId,
      inventoryItemId: item.id,
      description: item.name,
      quantity: 1,
      unitPrice: item.sell_price,
    });
  }

  return (
    <div className="mt-3 space-y-2">
      <div className="relative">
        <ScanLine className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={scanCode}
          onChange={(e) => setScanCode(e.target.value)}
          onKeyDown={handleScan}
          placeholder="Scan barcode SKU untuk tambah cepat"
          disabled={isExecuting}
          className="pl-8"
        />
      </div>
      {scanError && <p className="text-xs text-destructive">{scanError}</p>}

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
        className="space-y-2"
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
    </div>
  );
}
