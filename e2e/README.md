# Running the E2E suite

These tests drive a real browser through the cashier flow — they create shops,
tickets and payments. They must never point at the production project, so the
credentials are read from `E2E_*` variables rather than `.env.local`, and
`playwright.config.ts` refuses to start without them.

Two ways to get a throwaway database:

## Option A — local Supabase (needs Docker), what this repo is set up for

```bash
./node_modules/.bin/supabase start   # boots Postgres + API, applies supabase/migrations
```

`supabase/config.toml` is committed, so `init` is already done. `start` prints an
API URL (usually `http://127.0.0.1:54321`) plus anon and service_role keys —
they are the CLI's fixed demo keys and only work against localhost. Put them in
`.env.local`:

```bash
E2E_SUPABASE_URL=http://127.0.0.1:54321
E2E_SUPABASE_ANON_KEY=<anon key from supabase start>
E2E_SUPABASE_SERVICE_ROLE_KEY=<service_role key from supabase start>
E2E_SESSION_SECRET=e2e-only-session-secret
```

`supabase/seed.sql` runs on every `start`/`db reset`. It only grants the API
roles their DML rights, which the hosted project does through default
privileges and the local stack does not — without it every query comes back
"permission denied". RLS behaves the same in both.

Stop the stack with `./node_modules/.bin/supabase stop`, wipe it back to the
migrations with `./node_modules/.bin/supabase db reset`.

## Option B — a second Supabase cloud project

Create an empty project, run every file in `supabase/migrations/` against it in
order, then fill in the same `E2E_*` variables with that project's URL and keys.
Note the free plan allows two active projects per member, so this may require
pausing another one.

## Then

```bash
npm run setup:test-data    # seeds a shop, its PIN-less account, and sample inventory
npm run test:e2e           # boots its own dev server on port 3100
```

`npm run test:e2e:ui` opens the Playwright runner, `npm run test:e2e:debug`
steps through a spec.

CI skips this suite: the workflow has no database to point it at. Wire the
`E2E_*` values in as repository secrets to turn it on there.
