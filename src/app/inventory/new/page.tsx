"use client";

import { useAction } from "next-safe-action/hooks";
import { createInventoryItem } from "../actions";
import { firstActionError } from "@/lib/action-error";
import { PageShell } from "@/components/page-shell";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function NewInventoryItemPage() {
  const { execute, isExecuting, result } = useAction(createInventoryItem);
  const errorMessage = firstActionError(result);

  return (
    <PageShell maxWidth="max-w-md">
      <PageHeader title="Barang baru" backHref="/inventory" />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          execute({
            name: String(formData.get("name") ?? ""),
            sku: String(formData.get("sku") ?? ""),
            unit: String(formData.get("unit") ?? "pcs"),
            costPrice: Number(formData.get("costPrice")),
            sellPrice: Number(formData.get("sellPrice")),
            stockQty: Number(formData.get("stockQty")),
            reorderPoint: Number(formData.get("reorderPoint")),
          });
        }}
        className="space-y-4"
      >
        <div className="space-y-1.5">
          <Label htmlFor="name">Nama barang</Label>
          <Input id="name" name="name" required />
        </div>

        <div className="flex gap-3">
          <div className="flex-1 space-y-1.5">
            <Label htmlFor="sku">SKU (opsional)</Label>
            <Input id="sku" name="sku" />
          </div>
          <div className="w-24 space-y-1.5">
            <Label htmlFor="unit">Satuan</Label>
            <Input id="unit" name="unit" defaultValue="pcs" />
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex-1 space-y-1.5">
            <Label htmlFor="costPrice">Harga modal</Label>
            <Input
              id="costPrice"
              name="costPrice"
              type="number"
              step="1"
              min="0"
              defaultValue={0}
              required
            />
          </div>
          <div className="flex-1 space-y-1.5">
            <Label htmlFor="sellPrice">Harga jual</Label>
            <Input
              id="sellPrice"
              name="sellPrice"
              type="number"
              step="1"
              min="0"
              defaultValue={0}
              required
            />
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex-1 space-y-1.5">
            <Label htmlFor="stockQty">Stok awal</Label>
            <Input
              id="stockQty"
              name="stockQty"
              type="number"
              step="1"
              min="0"
              defaultValue={0}
              required
            />
          </div>
          <div className="flex-1 space-y-1.5">
            <Label htmlFor="reorderPoint">Titik reorder</Label>
            <Input
              id="reorderPoint"
              name="reorderPoint"
              type="number"
              step="1"
              min="0"
              defaultValue={0}
              required
            />
          </div>
        </div>

        {errorMessage && (
          <Alert variant="destructive">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <Button type="submit" disabled={isExecuting} className="w-full">
          {isExecuting ? "Menyimpan..." : "Simpan barang"}
        </Button>
      </form>
    </PageShell>
  );
}
