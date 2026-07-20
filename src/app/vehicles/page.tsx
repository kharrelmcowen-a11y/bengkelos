import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { createAdminClient } from "@/lib/supabase/admin";
import { PageShell } from "@/components/page-shell";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default async function VehiclesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const session = await getSession();
  if (!session) redirect("/login");

  const supabase = createAdminClient();
  let query = supabase
    .from("vehicles")
    .select("id, plate_number, brand, model, customers(name)")
    .eq("shop_id", session.shopId)
    .order("plate_number", { ascending: true })
    .limit(30);

  if (q?.trim()) {
    query = query.ilike("plate_number", `%${q.trim()}%`);
  }

  const { data: vehicles } = await query;

  return (
    <PageShell>
      <PageHeader
        title="Cari kendaraan"
        description="Lihat riwayat servis berdasarkan nomor plat"
        backHref="/dashboard"
        backLabel="Dashboard"
      />

      <form method="GET" className="flex gap-2">
        <Input
          name="q"
          defaultValue={q ?? ""}
          placeholder="Nomor plat (mis. B1234XYZ)"
          className="flex-1"
        />
        <Button type="submit">
          <Search className="size-4" />
          Cari
        </Button>
      </form>

      <div className="mt-6 space-y-3">
        {!vehicles || vehicles.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            {q ? "Tidak ada kendaraan yang cocok." : "Belum ada kendaraan."}
          </p>
        ) : (
          vehicles.map((vehicle) => {
            const customer = Array.isArray(vehicle.customers)
              ? vehicle.customers[0]
              : vehicle.customers;
            return (
              <Link key={vehicle.id} href={`/vehicles/${vehicle.id}`}>
                <Card className="p-4 transition-colors hover:bg-muted/50">
                  <span className="font-medium">{vehicle.plate_number}</span>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {vehicle.brand} {vehicle.model}
                    {customer?.name ? ` — ${customer.name}` : ""}
                  </p>
                </Card>
              </Link>
            );
          })
        )}
      </div>
    </PageShell>
  );
}
