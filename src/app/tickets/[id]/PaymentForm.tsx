"use client";

import { useAction } from "next-safe-action/hooks";
import { addPayment } from "../actions";
import { firstActionError } from "@/lib/action-error";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
        <Input
          name="amount"
          type="number"
          step="1"
          min="1"
          placeholder="Jumlah bayar"
          required
          className="flex-1"
        />
        <select
          name="method"
          defaultValue="cash"
          className="h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
        >
          <option value="cash">Tunai</option>
          <option value="transfer">Transfer</option>
          <option value="qris">QRIS</option>
          <option value="card">Kartu</option>
        </select>
        <Button type="submit" variant="secondary" disabled={isExecuting}>
          {isExecuting ? "..." : "Bayar"}
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
