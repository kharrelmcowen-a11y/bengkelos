# Security

BengkelOS runs one auto repair shop's till, so its threat model is small and
unusual enough to be worth writing down.

## What protects the app

- **A PIN per staff member.** `verify_staff_pin()` compares it against a bcrypt
  hash inside Postgres, so the app never handles the hash and a database dump
  does not hand over the PINs. Five wrong tries from one caller in fifteen
  minutes lock that caller out. The lockout buckets by caller rather than by
  account on purpose: a stranger must not be able to lock the shop out of its
  own till mid-shift, which would cost the shop more than a slow attacker does.
- **Roles.** `owner` reaches finance, reports and expenses; `cashier` and
  `mechanic` are turned away from all three and never see the buttons. Enforced
  by `ownerActionClient` on actions and a `session.role` check on each page.
- **A redirect, not a gate.** `src/proxy.ts` sends a visitor with no session
  cookie to `/login`. It only asks whether a cookie is present, never whether it
  is valid, so it is not relied on for anything: `getSession()` on every page and
  the action clients on every mutation are the real checks. It exists to cover
  the four client-only form pages, which cannot call `getSession()` themselves.
- **A signed session cookie.** `SESSION_SECRET` signs it; tampering invalidates it.
- **Server-side data access only.** Every query runs on the server with the
  Supabase service role key, which is never shipped to the browser. RLS is on
  with no anon or authenticated policies, so a leaked publishable key reads
  nothing. Tenant scoping (`shop_id`) is enforced in application code, and a
  test walks the source and fails if a write forgets the filter.
- **`CRON_SECRET`** — the appointment-reminder endpoint rejects callers that do
  not present it as a bearer token.

## Reporting a problem

Email kharrelmcowen@gmail.com. Do not open a public issue for anything that
would expose shop or customer data.

## If a secret leaks

- `SUPABASE_SERVICE_ROLE_KEY` — run `bash scripts/rotate-service-key.sh`. It
  reads the new key from a hidden prompt, updates Vercel, redeploys, verifies.
- **A staff PIN** — `npm run set-pin -- --role <role> --prod` sets a new one at a
  hidden prompt. It takes effect on the next sign-in; sessions already issued run
  out on their own twelve-hour clock.
- `SESSION_SECRET` — set a new value in Vercel and redeploy; the till signs
  itself back in on the next request.

## Dependencies

CI fails on any `npm audit` finding of high severity or worse, and Dependabot
opens grouped update PRs weekly plus standalone security PRs as they land.
