"use client";

import { useAction } from "next-safe-action/hooks";
import { markArrived, cancelAppointment } from "./actions";
import { firstActionError } from "@/lib/action-error";
import { Button } from "@/components/ui/button";

export function AppointmentActions({
  appointmentId,
}: {
  appointmentId: string;
}) {
  const arrive = useAction(markArrived);
  const cancel = useAction(cancelAppointment);
  const errorMessage =
    firstActionError(arrive.result) || firstActionError(cancel.result);

  return (
    <div className="mt-3 space-y-2">
      <div className="flex gap-2">
        <Button
          type="button"
          size="sm"
          disabled={arrive.isExecuting || cancel.isExecuting}
          onClick={() => arrive.execute({ appointmentId })}
        >
          {arrive.isExecuting ? "..." : "Tandai datang"}
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          disabled={arrive.isExecuting || cancel.isExecuting}
          onClick={() => cancel.execute({ appointmentId })}
        >
          {cancel.isExecuting ? "..." : "Batalkan"}
        </Button>
      </div>
      {errorMessage && (
        <p className="text-xs text-destructive">{errorMessage}</p>
      )}
    </div>
  );
}
