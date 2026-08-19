-- Local stack only. The hosted project grants the API roles their DML rights
-- through default privileges; the CLI's local Postgres does not reproduce that
-- for tables these migrations create, so service_role would hit
-- "permission denied" on every table. RLS still applies to anon and
-- authenticated exactly as it does in production.
grant usage on schema public to anon, authenticated, service_role;
grant select, insert, update, delete on all tables in schema public to service_role;
grant select, insert, update, delete on all tables in schema public to anon, authenticated;
grant usage, select on all sequences in schema public to anon, authenticated, service_role;
