-- Initial schema for BengkelOS (POS / inventory / finance for auto repair shops)
-- Multi-tenant from day 1: every business table carries shop_id, even with a single shop today.
-- Staff auth is PIN-based (no Supabase Auth session), so RLS is enabled with no anon/authenticated
-- policies — all reads/writes go through the server using the service_role key, which bypasses RLS.
-- The app layer is responsible for scoping every query by shop_id.

create extension if not exists "pgcrypto";

create table shops (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  address text,
  phone text,
  created_at timestamptz not null default now()
);

create table staff (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid not null references shops(id) on delete cascade,
  name text not null,
  role text not null check (role in ('owner', 'cashier', 'mechanic')),
  pin text not null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  unique (shop_id, pin)
);

create table customers (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid not null references shops(id) on delete cascade,
  name text not null,
  phone text,
  created_at timestamptz not null default now()
);

create table vehicles (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid not null references shops(id) on delete cascade,
  customer_id uuid not null references customers(id) on delete cascade,
  plate_number text not null,
  brand text,
  model text,
  year int,
  notes text,
  created_at timestamptz not null default now()
);

create table inventory_items (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid not null references shops(id) on delete cascade,
  sku text,
  name text not null,
  unit text not null default 'pcs',
  cost_price numeric(12, 2) not null default 0,
  sell_price numeric(12, 2) not null default 0,
  stock_qty numeric(12, 2) not null default 0,
  reorder_point numeric(12, 2) not null default 0,
  created_at timestamptz not null default now()
);

create table service_tickets (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid not null references shops(id) on delete cascade,
  customer_id uuid not null references customers(id) on delete restrict,
  vehicle_id uuid not null references vehicles(id) on delete restrict,
  staff_id uuid not null references staff(id) on delete restrict,
  status text not null default 'open' check (status in ('open', 'in_progress', 'completed', 'cancelled')),
  notes text,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create table ticket_items (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid not null references shops(id) on delete cascade,
  ticket_id uuid not null references service_tickets(id) on delete cascade,
  inventory_item_id uuid references inventory_items(id) on delete set null,
  description text not null,
  quantity numeric(12, 2) not null default 1,
  unit_price numeric(12, 2) not null default 0,
  created_at timestamptz not null default now()
);

create table payments (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid not null references shops(id) on delete cascade,
  ticket_id uuid not null references service_tickets(id) on delete cascade,
  staff_id uuid not null references staff(id) on delete restrict,
  amount numeric(12, 2) not null,
  method text not null check (method in ('cash', 'transfer', 'qris', 'card')),
  paid_at timestamptz not null default now()
);

create table stock_movements (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid not null references shops(id) on delete cascade,
  inventory_item_id uuid not null references inventory_items(id) on delete cascade,
  staff_id uuid references staff(id) on delete set null,
  change_qty numeric(12, 2) not null,
  reason text not null check (reason in ('purchase', 'sale', 'adjustment', 'ticket_deduct')),
  reference_id uuid,
  created_at timestamptz not null default now()
);

create index on staff (shop_id);
create index on customers (shop_id);
create index on vehicles (shop_id, customer_id);
create index on inventory_items (shop_id);
create index on service_tickets (shop_id, status);
create index on ticket_items (ticket_id);
create index on payments (shop_id, ticket_id);
create index on stock_movements (shop_id, inventory_item_id);

alter table shops enable row level security;
alter table staff enable row level security;
alter table customers enable row level security;
alter table vehicles enable row level security;
alter table inventory_items enable row level security;
alter table service_tickets enable row level security;
alter table ticket_items enable row level security;
alter table payments enable row level security;
alter table stock_movements enable row level security;
