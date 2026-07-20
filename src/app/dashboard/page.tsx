import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { logout } from "./actions";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <main className="min-h-screen bg-neutral-950 p-6 text-white">
      <div className="mx-auto max-w-md">
        <h1 className="text-lg font-semibold">Halo, {session.name}</h1>
        <p className="text-sm text-neutral-400 capitalize">{session.role}</p>

        <form action={logout} className="mt-6">
          <button
            type="submit"
            className="rounded-lg border border-neutral-700 px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-900"
          >
            Keluar
          </button>
        </form>
      </div>
    </main>
  );
}
