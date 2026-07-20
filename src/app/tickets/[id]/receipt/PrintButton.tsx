"use client";

import { Button } from "@/components/ui/button";

export function PrintButton() {
  return (
    <Button
      type="button"
      onClick={() => window.print()}
      className="w-full print:hidden"
    >
      Cetak struk
    </Button>
  );
}
