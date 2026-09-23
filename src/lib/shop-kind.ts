// One codebase serves both car and motorcycle shops; the few words that differ
// between them live here. Set per deployment, so a motor shop's build never
// says "mobil". NEXT_PUBLIC_ because the item form is a client component.
export type ShopKind = "mobil" | "motor";

export const shopKind: ShopKind =
  process.env.NEXT_PUBLIC_SHOP_KIND === "motor" ? "motor" : "mobil";

const copy = {
  mobil: {
    vehicle: "mobil",
    brandPlaceholder: "Toyota",
    modelPlaceholder: "Avanza",
    itemPlaceholder: "Deskripsi (ganti oli, servis rem, dll)",
    notesPlaceholder: "Keluhan / jenis servis",
  },
  motor: {
    vehicle: "motor",
    brandPlaceholder: "Honda",
    modelPlaceholder: "Vario 125",
    itemPlaceholder: "Deskripsi (ganti oli, servis CVT, dll)",
    notesPlaceholder: "Keluhan / jenis servis (mis. tarikan berat, rem bunyi)",
  },
} as const;

export const shopCopy = copy[shopKind];
