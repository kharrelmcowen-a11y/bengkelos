import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { createAdminClient } from "@/lib/supabase/admin";

export default async function TicketsPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const supabase = createAdminClient();
  const { data: tickets } = await supabase
    .from("service_tickets")
    .select(
      "id, status, created_at, customers(name), vehicles(plate_number, brand, model)",
    )
    .eq("shop_id", session.shopId)
    .in("status", ["open", "in_progress"])
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-neutral-950 p-6 text-white">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">Tiket servis aktif</h1>
          <Link
            href="/tickets/new"
            className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-neutral-950"
          >
            + Tiket baru
          </Link>
        </div>

        <div className="mt-6 space-y-3">
          {!tickets || tickets.length === 0 ? (
            <p className="text-sm text-neutral-400">Belum ada tiket aktif.</p>
          ) : (
            tickets.map((ticket) => {
              const customer = Array.isArray(ticket.customers)
                ? ticket.customers[0]
                : ticket.customers;
              const vehicle = Array.isArray(ticket.vehicles)
                ? ticket.vehicles[0]
                : ticket.vehicles;

              return (
                <Link
                  key={ticket.id}
                  href={`/tickets/${ticket.id}`}
                  className="block rounded-lg border border-neutral-800 p-4 hover:bg-neutral-900"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{customer?.name}</span>
                    <span className="rounded-full bg-neutral-800 px-2 py-0.5 text-xs capitalize text-neutral-300">
                      {ticket.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-neutral-400">
                    {vehicle?.plate_number} — {vehicle?.brand} {vehicle?.model}
                  </p>
                </Link>
              );
            })
          )}
        </div>

        <Link
          href="/dashboard"
          className="mt-6 inline-block text-sm text-neutral-400 hover:text-white"
        >
          &larr; Kembali ke dashboard
        </Link>
      </div>
    </main>
  );
}
