# BengkelOS

Shop management app (POS/cashier, inventory, finance) for an auto repair shop (bengkel mobil). Built as a pilot for a single shop, schema kept multi-tenant-ready (`shop_id` on every table) for a later SaaS conversion.

## Stack

- Next.js (App Router) + TypeScript + Tailwind
- Supabase (Postgres, RLS) — deployed on Vercel

## Access

Every staff member signs in with a PIN. `verify_staff_pin()` compares it inside
Postgres against a bcrypt hash, so the app never handles the hash and a database
dump does not hand over the PINs. Five wrong tries from the same caller in
fifteen minutes locks that caller out; the counter can still work, because the
lockout buckets by caller rather than by account.

Roles are enforced, not decorative. `owner` reaches finance, reports and
expenses; `cashier` and `mechanic` are redirected away from them and never see
the buttons. The rule lives in `ownerActionClient` for actions and in a
`session.role !== "owner"` check on each of the three pages.

`src/proxy.ts` sends anyone without a session cookie to `/login`. It is a
redirect, not the security boundary — it only asks whether a cookie exists,
never whether it is valid. The real checks are `getSession()` on every page and
the action clients on every mutation. Its job is to cover the four client-only
form pages, which cannot call `getSession()` themselves, and any page added
later before someone remembers to guard it.

Set a PIN with:

```
STAFF_PIN=1234 npm run set-pin -- --role owner
npm run set-pin -- --list     # who exists, and who still has no PIN
```

The PIN is read from the environment rather than a flag, so it stays out of
shell history, and it is hashed inside Postgres, so the plaintext is never
written down.

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
