-- Notification system for staff
-- Supports alerts for low stock, appointments, completed tickets, etc.

create table notifications (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid not null references shops(id) on delete cascade,
  staff_id uuid references staff(id) on delete cascade, -- null for shop-wide notifications
  type text not null check (type in ('low_stock', 'appointment_reminder', 'ticket_completed', 'customer_loyalty', 'system')),
  title text not null,
  message text not null,
  data jsonb, -- additional context (e.g., item_id, ticket_id)
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index on notifications (shop_id, staff_id, read_at);
create index on notifications (shop_id, created_at desc);
create index on notifications (staff_id, read_at);

-- Function to create low stock notification
create or replace function notify_low_stock(p_shop_id uuid, p_item_id uuid, p_item_name text, p_current_qty int, p_reorder_point int)
returns void as $$
begin
  insert into notifications (shop_id, type, title, message, data)
  values (
    p_shop_id,
    'low_stock',
    'Stok barang rendah',
    p_item_name || ' tersisa ' || p_current_qty || ' unit (batas: ' || p_reorder_point || ')',
    jsonb_build_object('item_id', p_item_id, 'current_qty', p_current_qty, 'reorder_point', p_reorder_point)
  );
end;
$$ language plpgsql;

-- Function to create appointment reminder notification
create or replace function notify_appointment_reminder(p_shop_id uuid, p_appointment_id uuid, p_customer_name text, p_scheduled_at timestamptz)
returns void as $$
begin
  insert into notifications (shop_id, type, title, message, data)
  values (
    p_shop_id,
    'appointment_reminder',
    'Jadwal servis mendekat',
    p_customer_name || ' dijadwalkan pukul ' || to_char(p_scheduled_at, 'HH24:MI'),
    jsonb_build_object('appointment_id', p_appointment_id, 'customer_name', p_customer_name, 'scheduled_at', p_scheduled_at)
  );
end;
$$ language plpgsql;

-- Function to mark notifications as read
create or replace function mark_notifications_read(p_staff_id uuid)
returns void as $$
begin
  update notifications
  set read_at = now()
  where staff_id = p_staff_id or (staff_id is null and shop_id = (select shop_id from staff where id = p_staff_id));
end;
$$ language plpgsql;