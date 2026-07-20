"use client";

import { useAction } from "next-safe-action/hooks";
import { adjustStock } from "../actions";
import { firstActionError } from "@/lib/action-error";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
        <Input
          name="changeQty"
          type="number"
          step="0.01"
          placeholder="+10 atau -2"
          required
          className="flex-1"
        />
        <select
          name="reason"
          defaultValue="purchase"
          className="h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
        >
          <option value="purchase">Pembelian</option>
          <option value="adjustment">Penyesuaian</option>
        </select>
        <Button type="submit" variant="secondary" disabled={isExecuting}>
          {isExecuting ? "..." : "Terapkan"}
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
