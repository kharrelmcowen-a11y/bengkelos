-- 0007 created notifications without enabling row level security, so the table
-- was reachable with the public anon key while every other table denies it.
-- The app talks to Postgres with the service role, which bypasses RLS, so
-- enabling it with no policy matches the rest of the schema: deny everyone else.
alter table notifications enable row level security;
