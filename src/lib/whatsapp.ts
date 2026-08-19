function normalizePhone(phone: string): string | null {
  const digits = phone.replace(/[^\d]/g, "");
  if (!digits) return null;
  if (digits.startsWith("62")) return digits;
  if (digits.startsWith("0")) return `62${digits.slice(1)}`;
  return digits;
}

export function buildWhatsAppLink(
  phone: string | null | undefined,
  message: string,
): string | null {
  if (!phone) return null;
  const normalized = normalizePhone(phone);
  if (!normalized) return null;
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}

// The "car is ready" message staff sends once a ticket is paid and closed.
export function buildTicketDoneMessage(input: {
  customerName?: string | null;
  plateNumber?: string | null;
  shopName?: string | null;
  total: string;
}): string {
  const customer = input.customerName?.trim() || "Pak/Bu";
  const plate = input.plateNumber?.trim();
  const vehicle = plate ? `kendaraan ${plate}` : "kendaraan Anda";
  const shop = input.shopName?.trim() || "bengkel kami";
  return `Halo ${customer}, ${vehicle} sudah selesai diservis di ${shop}. Total: ${input.total}. Terima kasih!`;
}
