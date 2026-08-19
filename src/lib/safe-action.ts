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
