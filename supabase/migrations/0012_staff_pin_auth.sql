-- Puts a PIN back in front of the till.
--
-- 0011 removed the PIN because the shop wanted a till with nothing to type.
-- This restores it, but stored as a bcrypt hash rather than the plaintext the
-- original schema held: the repository is public, and a PIN that can be read
-- out of a database dump is a PIN that only takes one leak to lose.
--
-- The `unique (shop_id, pin)` constraint from 0001 still applies, and bcrypt is
-- what makes the same PIN usable on more than one row: every hash carries its
-- own salt, so two staff sharing a PIN still store two different values.

create table if not exists pin_attempts (
  id        uuid primary key default gen_random_uuid(),
  client    text not null,
  succeeded boolean not null,
  at        timestamptz not null default now()
);

create index if not exists pin_attempts_client_at_idx
  on pin_attempts (client, at desc);

alter table pin_attempts enable row level security;

-- Comparing hashes has to happen where the hash lives; the app never sees it.
create or replace function verify_staff_pin(p_pin text, p_client text)
returns table (
  staff_id   uuid,
  shop_id    uuid,
  staff_name text,
  staff_role text,
  locked     boolean
)
language plpgsql
security definer
-- `extensions` is on the path because that is where Supabase installs pgcrypto;
-- a plain Postgres puts it in public. Naming both keeps crypt() resolvable in
-- either, and pinning the path at all is what migration 0010 established.
set search_path = public, extensions
as $$
declare
  v_fails   int;
  v_matches int;
begin
  -- A four-digit PIN is ten thousand guesses. Unthrottled, that is an
  -- afternoon's work for anyone who finds the URL — and the source is public,
  -- so they already know the shape of what they are guessing at.
  -- ponytail: buckets by whatever the caller passes as p_client, so a rotating
  -- IP still gets through eventually. Per-account lockout if that stops being
  -- enough — but per-account also lets a stranger lock the shop out of its own
  -- till mid-shift, which is worse for a business than a slow attacker.
  delete from pin_attempts where at < now() - interval '1 day';

  select count(*) into v_fails
  from pin_attempts
  where client = p_client
    and not succeeded
    and at > now() - interval '15 minutes';

  if v_fails >= 5 then
    return query select null::uuid, null::uuid, null::text, null::text, true;
    return;
  end if;

  select count(*) into v_matches
  from staff s
  where s.active and s.pin is not null and s.pin = crypt(p_pin, s.pin);

  if v_matches = 0 then
    insert into pin_attempts (client, succeeded) values (p_client, false);
    return;
  end if;

  -- Two active accounts on one PIN means the shop_id below is a coin toss, and
  -- that id decides whose books the shift's takings land in. Refuse, the same
  -- way the PIN-less login refused to guess between two active rows.
  if v_matches > 1 then
    insert into pin_attempts (client, succeeded) values (p_client, false);
    raise exception 'PIN dipakai lebih dari satu akun aktif';
  end if;

  insert into pin_attempts (client, succeeded) values (p_client, true);

  return query
  select s.id, s.shop_id, s.name, s.role, false
  from staff s
  where s.active and s.pin is not null and s.pin = crypt(p_pin, s.pin);
end;
$$;

-- Setting a PIN also has to happen where crypt() lives, so the plaintext never
-- travels further than this call. scripts/set-staff-pin.ts is the only caller,
-- and it reads the PIN from the environment rather than an argument: a PIN
-- typed as a CLI flag lands in shell history, and this repository is public.
create or replace function set_staff_pin(p_staff_id uuid, p_pin text)
returns void
language plpgsql
security definer
set search_path = public, extensions
as $$
begin
  -- Same shape the login form enforces. Checked here too, because a PIN set
  -- outside those bounds is one the app can never accept — a silent lockout.
  if p_pin !~ '^\d{4,8}$' then
    raise exception 'PIN harus 4-8 angka';
  end if;

  -- Cost 10, not pgcrypto's default of 6. A four-digit PIN is ten thousand
  -- guesses; the throttle in verify_staff_pin is the real defence, but if a
  -- dump ever leaks, the cost factor is all that is left standing.
  update staff set pin = crypt(p_pin, gen_salt('bf', 10)) where id = p_staff_id;

  if not found then
    raise exception 'Staff tidak ditemukan';
  end if;
end;
$$;
