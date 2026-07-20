"use client";

import { useAction } from "next-safe-action/hooks";
import { createTicket } from "../actions";
import { firstActionError } from "@/lib/action-error";
import { PageShell } from "@/components/page-shell";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function NewTicketPage() {
  const { execute, isExecuting, result } = useAction(createTicket);
  const errorMessage = firstActionError(result);

  return (
    <PageShell maxWidth="max-w-md">
      <PageHeader title="Tiket servis baru" backHref="/tickets" />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          execute({
            customerName: String(formData.get("customerName") ?? ""),
            customerPhone: String(formData.get("customerPhone") ?? ""),
            plateNumber: String(formData.get("plateNumber") ?? ""),
            brand: String(formData.get("brand") ?? ""),
            model: String(formData.get("model") ?? ""),
            notes: String(formData.get("notes") ?? ""),
          });
        }}
        className="space-y-4"
      >
        <div className="space-y-1.5">
          <Label htmlFor="customerName">Nama customer</Label>
          <Input id="customerName" name="customerName" required />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="customerPhone">No. HP customer (opsional)</Label>
          <Input id="customerPhone" name="customerPhone" />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="plateNumber">Nomor plat</Label>
          <Input
            id="plateNumber"
            name="plateNumber"
            required
            className="uppercase"
          />
        </div>

        <div className="flex gap-3">
          <div className="flex-1 space-y-1.5">
            <Label htmlFor="brand">Merk (opsional)</Label>
            <Input id="brand" name="brand" />
          </div>
          <div className="flex-1 space-y-1.5">
            <Label htmlFor="model">Model (opsional)</Label>
            <Input id="model" name="model" />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="notes">Catatan (opsional)</Label>
          <Textarea id="notes" name="notes" rows={3} />
        </div>

        {errorMessage && (
          <Alert variant="destructive">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <Button type="submit" disabled={isExecuting} className="w-full">
          {isExecuting ? "Menyimpan..." : "Buat tiket"}
        </Button>
      </form>
    </PageShell>
  );
}
