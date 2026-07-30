-- Create storage bucket for ticket attachments
-- This needs to be run manually or via Supabase dashboard since
-- storage operations are not part of regular SQL migrations

-- Note: Run this in Supabase dashboard SQL editor or via API:
-- insert into storage.buckets (id, name, public) values ('ticket-attachments', 'ticket-attachments', true);