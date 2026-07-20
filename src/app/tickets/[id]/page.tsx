import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { createAdminClient } from "@/lib/supabase/admin";
import { completeTicket } from "../actions";
import { ItemForm } from "./ItemForm";
import { PaymentForm } from "./PaymentForm";

function formatIDR(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default async function TicketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getSession();
  if (!session) redirect("/login");

  const supabase = createAdminClient();

  const { data: ticket } = await supabase
    .from("service_tickets")
    .select(
      "id, status, notes, created_at, customers(name, phone), vehicles(plate_number, brand, model)",
    )
    .eq("id", id)
    .eq("shop_id", session.shopId)
    .maybeSingle();

  if (!ticket) notFound();

  const customer = Array.isArray(ticket.customers)
    ? ticket.customers[0]
    : ticket.customers;
  const vehicle = Array.isArray(ticket.vehicles)
    ? ticket.vehicles[0]
    : ticket.vehicles;

  const [{ data: items }, { data: payments }, { data: inventoryItems }] =
    await Promise.all([
      supabase
        .from("ticket_items")
        .select("id, description, quantity, unit_price")
        .eq("ticket_id", id)
        .order("created_at", { ascending: true }),
      supabase
        .from("payments")
        .select("id, amount, method, paid_at")
        .eq("ticket_id", id)
        .order("paid_at", { ascending: true }),
      supabase
        .from("inventory_items")
        .select("id, name, unit, sell_price, stock_qty")
        .eq("shop_id", session.shopId)
        .order("name", { ascending: true }),
    ]);

  const total = (items ?? []).reduce(
    (sum, item) => sum + item.quantity * item.unit_price,
    0,
  );
  const paid = (payments ?? []).reduce((sum, p) => sum + p.amount, 0);
  const balance = total - paid;
  const isCompleted = ticket.status === "completed";

  return (
    <main className="min-h-screen bg-neutral-950 p-6 text-white">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/tickets"
          className="text-sm text-neutral-400 hover:text-white"
        >
          &larr; Tiket aktif
        </Link>

        <div className="mt-3 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold">{customer?.name}</h1>
            <p className="text-sm text-neutral-400">
              {vehicle?.plate_number} — {vehicle?.brand} {vehicle?.model}
            </p>
          </div>
          <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs capitalize text-neutral-300">
            {ticket.status}
          </span>
        </div>

        {ticket.notes && (
          <p className="mt-3 rounded-lg bg-neutral-900 p-3 text-sm text-neutral-300">
            {ticket.notes}
          </p>
        )}

        <section className="mt-6">
          <h2 className="text-sm font-medium text-neutral-400">
            Item servis
          </h2>
          <div className="mt-2 divide-y divide-neutral-800 rounded-lg border border-neutral-800">
            {(items ?? []).length === 0 ? (
              <p className="p-3 text-sm text-neutral-500">Belum ada item.</p>
            ) : (
              (items ?? []).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 text-sm"
                >
                  <span>
                    {item.description}{" "}
                    <span className="text-neutral-500">
                      x{item.quantity}
                    </span>
                  </span>
                  <span>{formatIDR(item.quantity * item.unit_price)}</span>
                </div>
              ))
            )}
          </div>
          {!isCompleted && (
            <ItemForm
              ticketId={ticket.id}
              inventoryItems={inventoryItems ?? []}
            />
          )}
        </section>

        <section className="mt-6">
          <h2 className="text-sm font-medium text-neutral-400">
            Pembayaran
          </h2>
          <div className="mt-2 divide-y divide-neutral-800 rounded-lg border border-neutral-800">
            {(payments ?? []).length === 0 ? (
              <p className="p-3 text-sm text-neutral-500">
                Belum ada pembayaran.
              </p>
            ) : (
              (payments ?? []).map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-3 text-sm"
                >
                  <span className="capitalize">{payment.method}</span>
                  <span>{formatIDR(payment.amount)}</span>
                </div>
              ))
            )}
          </div>
          {!isCompleted && <PaymentForm ticketId={ticket.id} />}
        </section>

        <section className="mt-6 space-y-1 rounded-lg bg-neutral-900 p-4 text-sm">
          <div className="flex justify-between">
            <span className="text-neutral-400">Total</span>
            <span>{formatIDR(total)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">Dibayar</span>
            <span>{formatIDR(paid)}</span>
          </div>
          <div className="flex justify-between font-medium">
            <span>Sisa</span>
            <span>{formatIDR(balance)}</span>
          </div>
        </section>

        {!isCompleted && (
          <form action={completeTicket} className="mt-6">
            <input type="hidden" name="ticketId" value={ticket.id} />
            <button
              type="submit"
              disabled={balance > 0}
              className="w-full rounded-lg bg-white py-3 font-medium text-neutral-950 disabled:opacity-40"
            >
              {balance > 0 ? "Lunasi dulu sebelum selesai" : "Selesaikan tiket"}
            </button>
          </form>
        )}

        {isCompleted && (
          <Link
            href={`/tickets/${ticket.id}/receipt`}
            className="mt-6 block rounded-lg bg-white py-3 text-center font-medium text-neutral-950"
          >
            Lihat struk
          </Link>
        )}
      </div>
    </main>
  );
}
