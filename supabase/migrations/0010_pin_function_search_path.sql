-- Supabase's linter flags these as function_search_path_mutable: without a
-- pinned search_path, whoever calls them decides which schema their unqualified
-- table references resolve to.
alter function public.update_customer_loyalty(p_customer_id uuid, p_amount numeric) set search_path = public;
alter function public.mark_notifications_read(p_staff_id uuid) set search_path = public;
alter function public.notify_low_stock(p_shop_id uuid, p_item_id uuid, p_item_name text, p_current_qty integer, p_reorder_point integer) set search_path = public;
alter function public.notify_appointment_reminder(p_shop_id uuid, p_appointment_id uuid, p_customer_name text, p_scheduled_at timestamptz) set search_path = public;
