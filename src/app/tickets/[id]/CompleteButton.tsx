"use client";

import { useAction } from "next-safe-action/hooks";
import { completeTicket } from "../actions";
import { firstActionError } from "@/lib/action-error";

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
      <button
        type="button"
        onClick={() => execute({ ticketId })}
        disabled={balance > 0 || isExecuting}
        className="w-full rounded-lg bg-white py-3 font-medium text-neutral-950 disabled:opacity-40"
      >
        {balance > 0
          ? "Lunasi dulu sebelum selesai"
          : isExecuting
            ? "Menyelesaikan..."
            : "Selesaikan tiket"}
      </button>
      {errorMessage && <p className="mt-2 text-sm text-red-400">{errorMessage}</p>}
    </div>
  );
}
