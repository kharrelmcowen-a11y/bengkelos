"use client";

import { useAction } from "next-safe-action/hooks";
import { completeTicket } from "../actions";
import { firstActionError } from "@/lib/action-error";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function CompleteButton({
  ticketId,
  balance,
}: {
  ticketId: string;
  balance: number;
}) {
  const { execute, isExecuting, result } = useAction(completeTicket);
  const errorMessage = firstActionError(result);

  return (
    <div className="mt-6">
      <Button
        type="button"
        onClick={() => execute({ ticketId })}
        disabled={balance > 0 || isExecuting}
        className="w-full"
      >
        {balance > 0
          ? "Lunasi dulu sebelum selesai"
          : isExecuting
            ? "Menyelesaikan..."
            : "Selesaikan tiket"}
      </Button>
      {errorMessage && (
        <Alert variant="destructive" className="mt-2">
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
