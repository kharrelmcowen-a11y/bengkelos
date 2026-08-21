"use client";

import { useAction } from "next-safe-action/hooks";
import { signIn } from "./actions";
import { firstActionError } from "@/lib/action-error";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Set on the demo deployment only, so a client clicking through from a
// portfolio can get in. Never set in the shop's environment.
const demoPin = process.env.NEXT_PUBLIC_DEMO_PIN_HINT;

export default function LoginPage() {
  const { execute, isExecuting, result } = useAction(signIn);
  const errorMessage = firstActionError(result);

  return (
    <PageShell maxWidth="max-w-xs">
      <h1 className="mb-1 text-2xl font-semibold">BengkelOS</h1>
      <p className="text-muted-foreground mb-6 text-sm">Masukkan PIN untuk mulai.</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          execute({ pin: String(formData.get("pin") ?? "") });
        }}
        className="space-y-4"
      >
        <div className="space-y-1.5">
          <Label htmlFor="pin">PIN</Label>
          <Input
            id="pin"
            name="pin"
            type="password"
            /* The till lives on a phone at the counter, so ask the phone for
               its number pad instead of building one. */
            inputMode="numeric"
            autoComplete="off"
            autoFocus
            maxLength={8}
            placeholder="••••"
            className="text-center text-2xl tracking-[0.4em]"
          />
        </div>

        {errorMessage ? (
          <Alert variant="destructive">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        ) : null}

        <Button type="submit" className="w-full" disabled={isExecuting}>
          {isExecuting ? "Memeriksa…" : "Masuk"}
        </Button>
      </form>

      {demoPin ? (
        <p className="text-muted-foreground mt-6 text-center text-xs">
          Demo — PIN <span className="font-mono tracking-widest">{demoPin}</span>
        </p>
      ) : null}
    </PageShell>
  );
}
