-- The bucket was created public, so any ticket photo or document could be read
-- by anyone holding the URL. The app now stores the storage key and mints
-- short-lived signed URLs, so the bucket no longer needs public reads.
update storage.buckets set public = false where id = 'ticket-attachments';
