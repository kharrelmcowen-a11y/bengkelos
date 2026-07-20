"use client";

import { useAction } from "next-safe-action/hooks";
import { deletePayment } from "../actions";
import { firstActionError } from "@/lib/action-error";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function DeletePaymentButton({ paymentId }: { paymentId: string }) {
  const { execute, isExecuting, result } = useAction(deletePayment);
  const errorMessage = firstActionError(result);

  return (
    <div className="flex items-center gap-1">
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        disabled={isExecuting}
        onClick={() => execute({ paymentId })}
        aria-label="Hapus pembayaran"
      >
        <X className="size-3.5" />
      </Button>
      {errorMessage && (
        <span className="text-xs text-destructive">{errorMessage}</span>
      )}
    </div>
  );
}
