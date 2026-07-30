#!/usr/bin/env tsx
/**
 * Setup script for test data
 * Creates a test shop and staff member for E2E testing
 * Usage: npx tsx scripts/setup-test-data.ts
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { randomUUID } from 'crypto';

// Load environment variables from .env.local
function loadEnvFile(filePath: string) {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith('#') && trimmedLine.includes('=')) {
        const [key, ...valueParts] = trimmedLine.split('=');
        const value = valueParts.join('=').trim();
        // Remove quotes if present
        const cleanValue = value.replace(/^["']|["']$/g, '');
        process.env[key.trim()] = cleanValue;
      }
    }
  } catch (error) {
    console.log(`Could not load ${filePath}, using system environment variables`);
  }
}

// Try to load .env.local from the project root
const envPath = resolve(process.cwd(), '.env.local');
loadEnvFile(envPath);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables:');
  console.error('- NEXT_PUBLIC_SUPABASE_URL');
  console.error('- SUPABASE_SERVICE_ROLE_KEY');
  console.error('\nMake sure .env.local exists in the project root with these variables set.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupTestData() {
  console.log('Setting up test data for E2E testing...');

  try {
    // Check if test shop already exists
    const { data: existingShops } = await supabase
      .from('shops')
      .select('id')
      .eq('name', 'Test Shop E2E')
      .limit(1);

    let shopId;
    if (existingShops && existingShops.length > 0) {
      shopId = existingShops[0].id;
      console.log('Test shop already exists:', shopId);
    } else {
      // Create test shop
      const { data: newShop, error: shopError } = await supabase
        .from('shops')
        .insert({
          name: 'Test Shop E2E',
          address: '123 Test Street',
          phone: '08123456789',
        })
        .select('id')
        .single();

      if (shopError || !newShop) {
        console.error('Error creating test shop:', shopError);
        process.exit(1);
      }

      shopId = newShop.id;
      console.log('✓ Created test shop:', shopId);
    }

    // Check if test staff already exists
    const { data: existingStaff } = await supabase
      .from('staff')
      .select('id')
      .eq('shop_id', shopId)
      .eq('pin', '1234')
      .limit(1);

    if (existingStaff && existingStaff.length > 0) {
      console.log('Test staff already exists with PIN 1234');
    } else {
      // Create test staff with PIN 1234
      const { error: staffError } = await supabase
        .from('staff')
        .insert({
          shop_id: shopId,
          name: 'Test Staff',
          pin: '1234',
          role: 'owner',
          active: true,
        });

      if (staffError) {
        console.error('Error creating test staff:', staffError);
        process.exit(1);
      }

      console.log('✓ Created test staff with PIN 1234');
    }

    // Create some test inventory items
    const { data: existingItems } = await supabase
      .from('inventory_items')
      .select('id')
      .eq('shop_id', shopId)
      .limit(1);

    if (!existingItems || existingItems.length === 0) {
      const testItems = [
        { name: 'Oli Mesin', sku: 'OLI001', unit: 'botol', cost_price: 30000, sell_price: 45000, stock_qty: 50, reorder_point: 10 },
        { name: 'Kampas Rem', sku: 'KAM001', unit: 'set', cost_price: 150000, sell_price: 200000, stock_qty: 20, reorder_point: 5 },
        { name: 'Busi', sku: 'BUS001', unit: 'pcs', cost_price: 25000, sell_price: 35000, stock_qty: 100, reorder_point: 20 },
      ];

      for (const item of testItems) {
        const { error: itemError } = await supabase
          .from('inventory_items')
          .insert({
            shop_id: shopId,
            ...item,
          });

        if (itemError) {
          console.error('Error creating test item:', itemError);
        }
      }

      console.log('✓ Created test inventory items');
    } else {
      console.log('Test inventory items already exist');
    }

    console.log('\n✓ Test data setup complete!');
    console.log('You can now login with PIN: 1234');
    console.log('Test shop ID:', shopId);
  } catch (error) {
    console.error('Error during setup:', error);
    process.exit(1);
  }
}

setupTestData();