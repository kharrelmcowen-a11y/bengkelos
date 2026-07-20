import { SupabaseClient } from "@supabase/supabase-js";

// Shared find-or-create-by-plate flow, used by ticket creation and by
// turning an appointment into a ticket on arrival.
export async function findOrCreateVehicle(
  supabase: SupabaseClient,
  shopId: string,
  input: {
    plateNumber: string;
    customerName: string;
    customerPhone?: string;
    brand?: string;
    model?: string;
  },
): Promise<{ vehicleId: string; customerId: string }> {
  const { data: existingVehicle } = await supabase
    .from("vehicles")
    .select("id, customer_id")
    .eq("shop_id", shopId)
    .eq("plate_number", input.plateNumber)
    .maybeSingle();

  if (existingVehicle) {
    return {
      vehicleId: existingVehicle.id,
      customerId: existingVehicle.customer_id,
    };
  }

  const { data: customer, error: customerError } = await supabase
    .from("customers")
    .insert({
      shop_id: shopId,
      name: input.customerName,
      phone: input.customerPhone || null,
    })
    .select("id")
    .single();

  if (customerError || !customer) throw new Error("Gagal simpan customer");

  const { data: vehicle, error: vehicleError } = await supabase
    .from("vehicles")
    .insert({
      shop_id: shopId,
      customer_id: customer.id,
      plate_number: input.plateNumber,
      brand: input.brand || null,
      model: input.model || null,
    })
    .select("id")
    .single();

  if (vehicleError || !vehicle) throw new Error("Gagal simpan kendaraan");

  return { vehicleId: vehicle.id, customerId: customer.id };
}
