# BengkelOS

Shop management app (POS/cashier, inventory, finance) for an auto repair shop (bengkel mobil). Built as a pilot for a single shop, schema kept multi-tenant-ready (`shop_id` on every table) for a later SaaS conversion.

## Stack

- Next.js (App Router) + TypeScript + Tailwind
- Supabase (Postgres, RLS) — deployed on Vercel

## Access

The shop asked for a till with nothing to type, so the app has no login of its
own: `/login` mints a session for the shop's single active `staff` row and
redirects to the dashboard. Every page is open to that account — there are no
roles to tell apart, and no way to sign out: clearing the session only sends the
till through `/login` again. Locking the till means rotating
`SITE_ACCESS_TOKEN` (see [SECURITY.md](SECURITY.md)).

What keeps the shop's takings off the open internet is `src/proxy.ts`: any
request without the access cookie gets a 404. Opening the site once with
`?k=<SITE_ACCESS_TOKEN>` sets that cookie for a year and drops the token from
the address bar. Every allowed request re-stamps it, so the year runs from the
last visit: a till in daily use never reaches the expiry. Leave `SITE_ACCESS_TOKEN` unset outside production and the gate
stays open, which is what local development and CI rely on; a production build
without it answers 404 to everything rather than serving the shop to whoever
finds the URL.

If a second active `staff` row ever appears, `/login` refuses to guess which
shop the till belongs to and returns a 500 instead of writing the day's takings
into another shop's books.

## Phases

1. **POS/Cashier** — service tickets (customer + vehicle + items), checkout/payment, daily transaction log.
2. **Inventory** — spare parts catalog, stock levels, reorder points, auto-deduct on ticket completion.
3. **Finance** — expense tracking, P&L, cash flow dashboard.

Also shipped: appointments with a daily reminder cron, customer loyalty points,
ticket attachments on a private storage bucket, in-app notifications, and a
one-tap WhatsApp nudge when a car is ready.

## Setup

```bash
npm install
cp .env.example .env.local
npx supabase start          # local Postgres + API, applies supabase/migrations
npm run setup:test-data     # a shop, its single account, sample inventory
npm run dev
```

Development runs against the local Supabase stack; production credentials live
in Vercel only. `supabase/seed.sql` grants the API roles their DML rights, which
the hosted project does through default privileges and the local stack does not.

## Environment

| Variable | Where | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | both | Supabase project API URL |
| `SUPABASE_SERVICE_ROLE_KEY` | both | server-side DB access; bypasses RLS |
| `SESSION_SECRET` | both | signs the session cookie |
| `CRON_SECRET` | production | bearer token the appointment-reminder cron must present |
| `SITE_ACCESS_TOKEN` | production | secret-link gate; unset disables the gate |

Rotate the service key with `bash scripts/rotate-service-key.sh` — it reads the
new value from a hidden prompt, checks it, updates Vercel, redeploys, verifies.

## Tests

```bash
npm test          # unit tests (node:test)
npm run test:e2e  # Playwright, against its own Supabase stack — see e2e/README.md
```

## Schema

Apply `supabase/migrations/*.sql` in order (shops, staff, customers, vehicles,
service_tickets, ticket_items, payments, inventory_items, stock_movements,
expenses, appointments, ticket_attachments, notifications). RLS is enabled with
no anon/authenticated policies: the app talks to Supabase server-side with the
service role key and enforces `shop_id` scoping in application code. A test
walks the source and fails if any write forgets that filter.

## Deploying

The GitHub repo is **not** connected to Vercel, so by default `git push` does
not deploy:

```bash
vercel --prod
```

CI can do it instead, which is the safer route because a laptop deploy skips
every check. Add `VERCEL_TOKEN`, `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` as
repository secrets (the last two are in `.vercel/project.json`) and a push to
`main` deploys once lint, types, unit tests, `npm audit`, the build and the E2E
suite pass. Leave the secrets unset and the deploy job skips itself.

## Security

See [SECURITY.md](SECURITY.md) for what guards the app, how to report a
problem, and what to do if a secret leaks. CI fails on any high-severity
`npm audit` finding, and Dependabot opens update PRs weekly.
