# BengkelOS

Shop management app (POS/cashier, inventory, finance) for an auto repair shop (bengkel mobil). Built as a pilot for a single shop, schema kept multi-tenant-ready (`shop_id` on every table) for a later SaaS conversion.

## Stack

- Next.js (App Router) + TypeScript + Tailwind
- Supabase (Postgres, RLS) — deployed on Vercel
- Staff auth: PIN-based (no Supabase Auth session, same pattern as KaraokeOS)

## Phases

1. **POS/Cashier** — staff PIN auth, service tickets (customer + vehicle + items), checkout/payment, daily transaction log.
2. **Inventory** — spare parts catalog, stock levels, reorder points, auto-deduct on ticket completion.
3. **Finance** — expense tracking, P&L, cash flow dashboard.

## Setup

```bash
npm install
cp .env.example .env.local   # fill in Supabase project URL/keys
npm run dev
```

Apply `supabase/migrations/0001_init.sql` to a Supabase project to get the schema (shops, staff, customers, vehicles, service_tickets, ticket_items, payments, inventory_items, stock_movements). RLS is enabled with no anon/authenticated policies — the app talks to Supabase server-side with the service role key and enforces `shop_id` scoping in application code, since staff auth is PIN-based rather than Supabase Auth sessions.
