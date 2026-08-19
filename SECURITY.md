# Security

BengkelOS runs one auto repair shop's till, so its threat model is small and
unusual enough to be worth writing down.

## What protects the app

- **The secret link.** `src/proxy.ts` returns 404 to any request without the
  access cookie. Opening the site once with `?k=<SITE_ACCESS_TOKEN>` sets that
  cookie for a year, and every allowed request pushes the year out again, so a
  till in daily use never locks itself out. This is the only thing standing
  between the internet and the shop's takings — the app itself has no password,
  by the shop's request.
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
- `SITE_ACCESS_TOKEN` — set a new value in Vercel and redeploy, then reopen the
  site once on the shop's device with the new `?k=` link. Every old cookie stops
  working immediately.
- `SESSION_SECRET` — set a new value in Vercel and redeploy; the till signs
  itself back in on the next request.

## Dependencies

CI fails on any `npm audit` finding of high severity or worse, and Dependabot
opens grouped update PRs weekly plus standalone security PRs as they land.
