"use client";

import { useAction } from "next-safe-action/hooks";
import { loginWithPin } from "./actions";
import { firstActionError } from "@/lib/action-error";

export default function LoginPage() {
  const { execute, isExecuting, result } = useAction(loginWithPin);
  const errorMessage = firstActionError(result);

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-950 p-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const pin = String(new FormData(e.currentTarget).get("pin") ?? "");
          execute({ pin });
        }}
        className="w-full max-w-xs rounded-2xl bg-neutral-900 p-6 shadow-xl"
      >
        <h1 className="mb-1 text-lg font-semibold text-white">BengkelOS</h1>
        <p className="mb-6 text-sm text-neutral-400">Masukkan PIN staff</p>

        <input
          name="pin"
          type="password"
          inputMode="numeric"
          autoFocus
          maxLength={6}
          placeholder="••••"
          className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-3 text-center text-2xl tracking-widest text-white outline-none focus:border-neutral-500"
        />

        {errorMessage && (
          <p className="mt-3 text-sm text-red-400">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={isExecuting}
          className="mt-4 w-full rounded-lg bg-white py-3 font-medium text-neutral-950 disabled:opacity-50"
        >
          {isExecuting ? "Memeriksa..." : "Masuk"}
        </button>
      </form>
    </main>
  );
}
