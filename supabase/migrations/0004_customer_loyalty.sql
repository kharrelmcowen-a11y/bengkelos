-- Customer loyalty and history tracking
-- This adds fields to track customer lifetime value and loyalty points

alter table customers 
  add column total_visits int default 0,
  add column total_spent numeric(12,2) default 0,
  add column loyalty_points int default 0,
  add column first_visit timestamptz,
  add column last_visit timestamptz;

-- Create index for customer loyalty queries
create index on customers (shop_id, total_spent desc);

-- Function to update customer loyalty when a ticket is completed
create or replace function update_customer_loyalty(p_customer_id uuid, p_amount numeric)
returns void as $$
begin
  update customers
  set 
    total_visits = total_visits + 1,
    total_spent = total_spent + p_amount,
    loyalty_points = loyalty_points + floor(p_amount / 1000), -- 1 point per 1000 spent
    last_visit = now(),
    first_visit = coalesce(first_visit, now())
  where id = p_customer_id;
end;
$$ language plpgsql;