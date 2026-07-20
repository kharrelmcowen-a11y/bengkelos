-- Step 6: appointment board (scheduling)
-- Denormalized customer/vehicle fields (not FK'd) because a booking may be made
-- before the customer/vehicle exist in the system; marking an appointment as
-- "arrived" creates/reuses the real customer+vehicle+ticket at that point,
-- the same find-or-create-by-plate flow tickets/new already uses.

create table appointments (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid not null references shops(id) on delete cascade,
  staff_id uuid not null references staff(id) on delete restrict,
  ticket_id uuid references service_tickets(id) on delete set null,
  customer_name text not null,
  customer_phone text,
  plate_number text not null,
  brand text,
  model text,
  scheduled_at timestamptz not null,
  notes text,
  status text not null default 'scheduled' check (status in ('scheduled', 'arrived', 'cancelled')),
  created_at timestamptz not null default now()
);

create index appointments_shop_scheduled_idx on appointments (shop_id, scheduled_at);

alter table appointments enable row level security;
