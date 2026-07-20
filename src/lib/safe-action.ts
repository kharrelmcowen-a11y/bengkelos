import { createSafeActionClient } from "next-safe-action";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

export const actionClient = createSafeActionClient({
  handleServerError(e) {
    return e.message;
  },
});

export const authActionClient = actionClient.use(async ({ next }) => {
  const session = await getSession();
  if (!session) redirect("/login");
  return next({ ctx: { session } });
});

export const ownerActionClient = actionClient.use(async ({ next }) => {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role !== "owner") throw new Error("Hanya owner yang bisa akses");
  return next({ ctx: { session } });
});
