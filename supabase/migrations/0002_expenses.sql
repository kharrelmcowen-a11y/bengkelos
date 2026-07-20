-- Phase 3: expense tracking for the finance/P&L dashboard.

create table expenses (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid not null references shops(id) on delete cascade,
  staff_id uuid not null references staff(id) on delete restrict,
  category text not null check (
    category in ('rent', 'utilities', 'salary', 'supplies', 'other')
  ),
  description text,
  amount numeric(12, 2) not null,
  spent_at date not null default current_date,
  created_at timestamptz not null default now()
);

create index on expenses (shop_id, spent_at);

alter table expenses enable row level security;
