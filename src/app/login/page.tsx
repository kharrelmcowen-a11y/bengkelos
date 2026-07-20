"use client";

import { useAction } from "next-safe-action/hooks";
import { loginWithPin } from "./actions";
import { firstActionError } from "@/lib/action-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function LoginPage() {
  const { execute, isExecuting, result } = useAction(loginWithPin);
  const errorMessage = firstActionError(result);

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-xs">
        <CardHeader>
          <h1 className="text-lg font-semibold">BengkelOS</h1>
          <p className="text-sm text-muted-foreground">Masukkan PIN staff</p>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const pin = String(
                new FormData(e.currentTarget).get("pin") ?? "",
              );
              execute({ pin });
            }}
            className="space-y-4"
          >
            <div className="space-y-1.5">
              <Label htmlFor="pin" className="sr-only">
                PIN
              </Label>
              <Input
                id="pin"
                name="pin"
                type="password"
                inputMode="numeric"
                autoFocus
                maxLength={6}
                placeholder="••••"
                className="h-14 text-center text-2xl tracking-widest"
              />
            </div>

            {errorMessage && (
              <Alert variant="destructive">
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" disabled={isExecuting} className="w-full">
              {isExecuting ? "Memeriksa..." : "Masuk"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
