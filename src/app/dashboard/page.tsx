import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { logout } from "./actions";
import { PageShell } from "@/components/page-shell";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Wrench, Package, LineChart } from "lucide-react";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <PageShell maxWidth="max-w-md">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Halo, {session.name}</h1>
          <Badge variant="secondary" className="mt-1 capitalize">
            {session.role}
          </Badge>
        </div>
        <form action={logout}>
          <Button type="submit" variant="ghost" size="sm">
            Keluar
          </Button>
        </form>
      </div>

      <div className="mt-6 space-y-3">
        <Link
          href="/tickets/new"
          className={buttonVariants({
            className: "h-auto w-full justify-start gap-3 py-3",
          })}
        >
          <PlusCircle className="size-4" />
          Tiket servis baru
        </Link>
        <Link
          href="/tickets"
          className={buttonVariants({
            variant: "outline",
            className: "h-auto w-full justify-start gap-3 py-3",
          })}
        >
          <Wrench className="size-4" />
          Lihat tiket aktif
        </Link>
        <Link
          href="/inventory"
          className={buttonVariants({
            variant: "outline",
            className: "h-auto w-full justify-start gap-3 py-3",
          })}
        >
          <Package className="size-4" />
          Stok barang
        </Link>
        {session.role === "owner" && (
          <Link
            href="/finance"
            className={buttonVariants({
              variant: "outline",
              className: "h-auto w-full justify-start gap-3 py-3",
            })}
          >
            <LineChart className="size-4" />
            Laporan keuangan
          </Link>
        )}
      </div>
    </PageShell>
  );
}
