-- Ticket attachments (photos, documents)
-- Supports before/after photos, insurance documents, etc.

create table ticket_attachments (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid not null references shops(id) on delete cascade,
  ticket_id uuid not null references service_tickets(id) on delete cascade,
  file_url text not null,
  file_name text not null,
  file_type text not null check (file_type in ('before', 'after', 'document', 'other')),
  file_size int, -- in bytes
  mime_type text,
  uploaded_by uuid references staff(id) on delete set null,
  created_at timestamptz not null default now()
);

create index on ticket_attachments (shop_id, ticket_id);
create index on ticket_attachments (ticket_id, file_type);

alter table ticket_attachments enable row level security;