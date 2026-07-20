"use client";

import { useAction } from "next-safe-action/hooks";
import { createExpense } from "../actions";
import { firstActionError } from "@/lib/action-error";
import { PageShell } from "@/components/page-shell";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function NewExpensePage() {
  const { execute, isExecuting, result } = useAction(createExpense);
  const errorMessage = firstActionError(result);

  return (
    <PageShell maxWidth="max-w-md">
      <PageHeader title="Catat pengeluaran" backHref="/expenses" />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          execute({
            category: String(formData.get("category")) as
              | "rent"
              | "utilities"
              | "salary"
              | "supplies"
              | "other",
            description: String(formData.get("description") ?? ""),
            amount: Number(formData.get("amount")),
            spentAt: String(formData.get("spentAt") ?? ""),
          });
        }}
        className="space-y-4"
      >
        <div className="space-y-1.5">
          <Label htmlFor="category">Kategori</Label>
          <select
            id="category"
            name="category"
            defaultValue="supplies"
            className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
          >
            <option value="rent">Sewa</option>
            <option value="utilities">Listrik/air</option>
            <option value="salary">Gaji</option>
            <option value="supplies">Perlengkapan</option>
            <option value="other">Lainnya</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="amount">Jumlah</Label>
          <Input
            id="amount"
            name="amount"
            type="number"
            step="1"
            min="1"
            required
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="spentAt">Tanggal</Label>
          <Input
            id="spentAt"
            name="spentAt"
            type="date"
            defaultValue={today()}
            required
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="description">Catatan (opsional)</Label>
          <Input id="description" name="description" />
        </div>

        {errorMessage && (
          <Alert variant="destructive">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <Button type="submit" disabled={isExecuting} className="w-full">
          {isExecuting ? "Menyimpan..." : "Simpan pengeluaran"}
        </Button>
      </form>
    </PageShell>
  );
}
