#!/usr/bin/env tsx
/**
 * Setup script for Supabase storage bucket
 * Run this to create the ticket-attachments storage bucket
 * Usage: npx tsx scripts/setup-storage-bucket.ts
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables:');
  console.error('- NEXT_PUBLIC_SUPABASE_URL');
  console.error('- SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupStorageBucket() {
  console.log('Setting up ticket-attachments storage bucket...');

  try {
    // Check if bucket already exists
    const { data: buckets } = await supabase.storage.listBuckets();
    const existingBucket = buckets?.find(b => b.name === 'ticket-attachments');

    if (existingBucket) {
      console.log('Bucket "ticket-attachments" already exists. Skipping creation.');
    } else {
      // Create the bucket
      const { error: createError } = await supabase.storage.createBucket('ticket-attachments', {
        public: true,
        fileSizeLimit: 10485760, // 10MB limit
      });

      if (createError) {
        console.error('Error creating bucket:', createError);
        process.exit(1);
      }

      console.log('✓ Created bucket "ticket-attachments"');
    }

    console.log('\n✓ Storage bucket setup complete!');
    console.log('Note: The application uses service role key for storage operations, so RLS policies are optional.');
    console.log('If you want to add RLS policies later, you can do so via the Supabase dashboard.');
  } catch (error) {
    console.error('Error during setup:', error);
    process.exit(1);
  }
}

setupStorageBucket();