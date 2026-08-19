# Running the E2E suite

These tests drive a real browser through the cashier flow — they create shops,
tickets and payments. They must never point at the production project, so the
credentials are read from `E2E_*` variables rather than `.env.local`, and
`playwright.config.ts` refuses to start without them.

Two ways to get a throwaway database:

## Option A — local Supabase (needs Docker)

```bash
npx supabase init          # once; writes supabase/config.toml
npx supabase start         # boots Postgres + API, applies supabase/migrations
```

`supabase start` prints an API URL (usually `http://127.0.0.1:54321`) plus anon
and service_role keys. Put them in `.env.local`:

```bash
E2E_SUPABASE_URL=http://127.0.0.1:54321
E2E_SUPABASE_ANON_KEY=<anon key from supabase start>
E2E_SUPABASE_SERVICE_ROLE_KEY=<service_role key from supabase start>
E2E_SESSION_SECRET=e2e-only-session-secret
E2E_TEST_PIN=1234
```

## Option B — a second Supabase cloud project

Create an empty project, run every file in `supabase/migrations/` against it in
order, then fill in the same `E2E_*` variables with that project's URL and keys.

## Then

```bash
npm run setup:test-data    # seeds a shop, staff PIN 1234, and sample inventory
npm run test:e2e           # boots its own dev server on port 3100
```

`npm run test:e2e:ui` opens the Playwright runner, `npm run test:e2e:debug`
steps through a spec.

CI skips this suite: the workflow has no database to point it at. Wire the
`E2E_*` values in as repository secrets to turn it on there.
