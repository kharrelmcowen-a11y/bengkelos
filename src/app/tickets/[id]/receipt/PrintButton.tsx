"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="w-full rounded-lg bg-white py-3 font-medium text-neutral-950 print:hidden"
    >
      Cetak struk
    </button>
  );
}
