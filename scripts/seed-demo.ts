#!/usr/bin/env tsx
/**
 * Fills a demo database with a shop that looks like it has been running for
 * six weeks: customers, vehicles, parts, paid tickets, expenses, bookings. It
 * is what a prospect sees when the pitch opens the dashboard.
 *
 * Usage:  DEMO_PIN=2468 npm run seed:demo -- --kind motor
 *         DEMO_PIN=1357 npm run seed:demo -- --kind mobil
 *
 * Environment:
 *   DEMO_SUPABASE_URL              the demo project, never the shop's
 *   DEMO_SUPABASE_SERVICE_ROLE_KEY asked at a hidden prompt when unset
 *   DEMO_PIN                       the owner PIN the prospect types in
 *   DEMO_SHOP_NAME                 optional, e.g. the name of the shop being pitched
 *   DEMO_WA_PHONE                  optional, your own number: the ticket that is
 *                                  ready today gets it, so the WA button can be
 *                                  tapped live without messaging a stranger
 *
 * Re-running replaces the shop of the same name, so the dates stay fresh — run
 * it the morning of a pitch. The login looks a PIN up across every shop, so the
 * car and motorcycle demos can share one database as long as their PINs differ.
 */

import { randomUUID } from "node:crypto";
import { createInterface } from "node:readline";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { formatIDR } from "../src/lib/format";

// The real shop's project. Demo rows must never land next to its books.
const PROD_REF = "hyivfiybznrfnhbzyyeb";

type Kind = "mobil" | "motor";

type Part = {
  sku: string;
  name: string;
  unit: string;
  cost: number;
  sell: number;
  stock: number; // what is left on the shelf today
  reorder: number;
};

type Line = { part?: string; labor?: string; price?: number; qty?: number; chance?: number };

type Job = { note: string; weight: number; lines: (v: Vehicle) => Line[]; forMatic?: boolean };

type Vehicle = { brand: string; model: string; matic: boolean };

type Profile = {
  shopName: string;
  address: string;
  phone: string;
  staff: { owner: string; cashier: string; mechanic: string };
  perDay: [number, number];
  workMinutes: [number, number];
  vehicles: Vehicle[];
  parts: Part[];
  jobs: Job[];
  expenses: { category: string; description: string; amount: number; day: number }[];
};

const motor: Profile = {
  shopName: "Bengkel Motor Maju Jaya",
  address: "Jl. Tanjungpura No. 118, Pontianak",
  phone: "0561-700118",
  staff: { owner: "Pak Hendra", cashier: "Kasir Lina", mechanic: "Mekanik Rudi" },
  perDay: [8, 15],
  workMinutes: [25, 120],
  vehicles: [
    { brand: "Honda", model: "Beat", matic: true },
    { brand: "Honda", model: "Beat", matic: true },
    { brand: "Honda", model: "Vario 125", matic: true },
    { brand: "Honda", model: "Vario 160", matic: true },
    { brand: "Honda", model: "Scoopy", matic: true },
    { brand: "Honda", model: "PCX 160", matic: true },
    { brand: "Honda", model: "Supra X 125", matic: false },
    { brand: "Honda", model: "Revo", matic: false },
    { brand: "Yamaha", model: "NMAX", matic: true },
    { brand: "Yamaha", model: "Aerox 155", matic: true },
    { brand: "Yamaha", model: "Mio M3", matic: true },
    { brand: "Yamaha", model: "Fazzio", matic: true },
    { brand: "Yamaha", model: "Jupiter Z1", matic: false },
    { brand: "Yamaha", model: "Vixion", matic: false },
    { brand: "Suzuki", model: "Satria F150", matic: false },
    { brand: "Suzuki", model: "Nex II", matic: true },
  ],
  parts: [
    { sku: "OLI-MPX2", name: "Oli AHM MPX2 0.8L (matic)", unit: "botol", cost: 47000, sell: 58000, stock: 34, reorder: 12 },
    { sku: "OLI-MPX1", name: "Oli AHM MPX1 0.8L (bebek)", unit: "botol", cost: 45000, sell: 55000, stock: 18, reorder: 8 },
    { sku: "OLI-YML", name: "Yamalube Super Matic 0.8L", unit: "botol", cost: 46000, sell: 57000, stock: 26, reorder: 10 },
    { sku: "OLI-FED", name: "Oli Federal Ultratec 0.8L", unit: "botol", cost: 38000, sell: 48000, stock: 20, reorder: 8 },
    { sku: "OLI-GARDAN", name: "Oli gardan 120ml", unit: "botol", cost: 12000, sell: 18000, stock: 45, reorder: 15 },
    { sku: "KMP-DPN", name: "Kampas rem depan (cakram)", unit: "set", cost: 38000, sell: 60000, stock: 16, reorder: 6 },
    { sku: "KMP-BLK", name: "Kampas rem belakang (tromol)", unit: "set", cost: 32000, sell: 50000, stock: 14, reorder: 6 },
    { sku: "VBELT-BEAT", name: "V-Belt Beat / Scoopy", unit: "pcs", cost: 85000, sell: 120000, stock: 2, reorder: 4 },
    { sku: "VBELT-VARIO", name: "V-Belt Vario / PCX", unit: "pcs", cost: 110000, sell: 150000, stock: 7, reorder: 3 },
    { sku: "VBELT-NMAX", name: "V-Belt NMAX / Aerox", unit: "pcs", cost: 125000, sell: 170000, stock: 5, reorder: 3 },
    { sku: "ROLLER", name: "Roller CVT (set 6)", unit: "set", cost: 45000, sell: 70000, stock: 10, reorder: 4 },
    { sku: "BUSI-CPR9", name: "Busi NGK CPR9EA-9", unit: "pcs", cost: 18000, sell: 28000, stock: 38, reorder: 12 },
    { sku: "BUSI-C7", name: "Busi NGK C7HSA", unit: "pcs", cost: 15000, sell: 25000, stock: 22, reorder: 8 },
    { sku: "FLT-UDARA", name: "Filter udara matic", unit: "pcs", cost: 45000, sell: 65000, stock: 11, reorder: 4 },
    { sku: "BAN-8090", name: "Ban IRC 80/90-14 tubeless", unit: "pcs", cost: 170000, sell: 215000, stock: 7, reorder: 3 },
    { sku: "BAN-9090", name: "Ban IRC 90/90-14 tubeless", unit: "pcs", cost: 195000, sell: 245000, stock: 5, reorder: 3 },
    { sku: "AKI-GTZ5S", name: "Aki GS GTZ5S", unit: "pcs", cost: 190000, sell: 245000, stock: 4, reorder: 2 },
    { sku: "GEAR-SET", name: "Gear set + rantai", unit: "set", cost: 180000, sell: 240000, stock: 3, reorder: 2 },
    { sku: "MINYAK-REM", name: "Minyak rem DOT 3", unit: "botol", cost: 15000, sell: 25000, stock: 17, reorder: 5 },
    { sku: "BOHLAM-H4", name: "Bohlam depan H4 12V", unit: "pcs", cost: 25000, sell: 40000, stock: 12, reorder: 4 },
    { sku: "COOLANT", name: "Air radiator / coolant 1L", unit: "botol", cost: 20000, sell: 30000, stock: 3, reorder: 5 },
    { sku: "INJ-CLEAN", name: "Injector cleaner", unit: "botol", cost: 25000, sell: 40000, stock: 13, reorder: 5 },
  ],
  jobs: [
    {
      note: "Ganti oli",
      weight: 30,
      lines: (v) => [{ part: motorOil(v) }, { part: "OLI-GARDAN", chance: v.matic ? 0.7 : 0 }],
    },
    {
      note: "Servis rutin",
      weight: 25,
      lines: (v) => [
        { labor: "Jasa servis rutin", price: 45000 },
        { part: motorOil(v) },
        { part: "OLI-GARDAN", chance: v.matic ? 1 : 0 },
        { part: v.matic ? "BUSI-CPR9" : "BUSI-C7", chance: 0.35 },
        { part: "FLT-UDARA", chance: v.matic ? 0.25 : 0 },
        { part: "INJ-CLEAN", chance: 0.2 },
      ],
    },
    {
      note: "Tarikan berat, servis CVT",
      weight: 12,
      forMatic: true,
      lines: (v) => [
        { labor: "Jasa servis CVT", price: 50000 },
        { part: "ROLLER", chance: 0.45 },
        { part: vbelt(v), chance: 0.35 },
      ],
    },
    {
      note: "Rem bunyi / blong",
      weight: 12,
      lines: () => [
        { labor: "Jasa ganti kampas rem", price: 15000 },
        { part: "KMP-DPN", chance: 0.7 },
        { part: "KMP-BLK", chance: 0.5 },
        { part: "MINYAK-REM", chance: 0.3 },
      ],
    },
    {
      note: "Ban botak",
      weight: 8,
      lines: () => [{ labor: "Jasa pasang ban", price: 15000 }, { part: "BAN-8090", chance: 0.55 }, { part: "BAN-9090", chance: 0.45 }],
    },
    {
      note: "Susah distarter",
      weight: 4,
      lines: () => [{ labor: "Jasa cek kelistrikan", price: 20000 }, { part: "AKI-GTZ5S" }],
    },
    {
      note: "Lampu depan mati",
      weight: 5,
      lines: () => [{ labor: "Jasa kelistrikan", price: 10000 }, { part: "BOHLAM-H4" }],
    },
    {
      note: "Rantai kendor, bunyi",
      weight: 4,
      forMatic: false,
      lines: () => [{ labor: "Jasa ganti gear set", price: 35000 }, { part: "GEAR-SET" }],
    },
    {
      note: "Servis injeksi",
      weight: 4,
      lines: () => [{ labor: "Jasa servis injeksi + throttle body", price: 60000 }, { part: "INJ-CLEAN" }, { part: "COOLANT", chance: 0.3 }],
    },
  ],
  expenses: [
    { category: "rent", description: "Sewa ruko", amount: 3500000, day: 1 },
    { category: "utilities", description: "Listrik PLN", amount: 850000, day: 5 },
    { category: "utilities", description: "Internet + air", amount: 420000, day: 6 },
    { category: "supplies", description: "Belanja oli & sparepart (grosir)", amount: 4200000, day: 3 },
    { category: "supplies", description: "Belanja ban & kampas rem", amount: 1850000, day: 17 },
    { category: "other", description: "Iuran keamanan + kebersihan", amount: 150000, day: 10 },
    { category: "salary", description: "Gaji 2 mekanik + kasir", amount: 6500000, day: 28 },
  ],
};

const mobil: Profile = {
  shopName: "Bengkel Mobil Karya Mandiri",
  address: "Jl. Adisucipto Km 3, Kubu Raya",
  phone: "0561-722030",
  staff: { owner: "Pak Hendra", cashier: "Kasir Lina", mechanic: "Mekanik Rudi" },
  perDay: [3, 6],
  workMinutes: [60, 300],
  vehicles: [
    { brand: "Toyota", model: "Avanza", matic: false },
    { brand: "Toyota", model: "Avanza", matic: false },
    { brand: "Toyota", model: "Innova", matic: false },
    { brand: "Toyota", model: "Rush", matic: true },
    { brand: "Toyota", model: "Calya", matic: false },
    { brand: "Daihatsu", model: "Xenia", matic: false },
    { brand: "Daihatsu", model: "Terios", matic: true },
    { brand: "Daihatsu", model: "Sigra", matic: false },
    { brand: "Honda", model: "Brio", matic: true },
    { brand: "Honda", model: "Mobilio", matic: false },
    { brand: "Honda", model: "HR-V", matic: true },
    { brand: "Suzuki", model: "Ertiga", matic: false },
    { brand: "Suzuki", model: "Carry Pick Up", matic: false },
    { brand: "Mitsubishi", model: "Xpander", matic: true },
    { brand: "Mitsubishi", model: "L300", matic: false },
  ],
  parts: [
    { sku: "OLI-HX7", name: "Oli Shell Helix HX7 4L", unit: "galon", cost: 320000, sell: 395000, stock: 16, reorder: 6 },
    { sku: "OLI-DSL", name: "Oli diesel Meditran SX 5L", unit: "galon", cost: 290000, sell: 360000, stock: 6, reorder: 3 },
    { sku: "FLT-OLI", name: "Filter oli (Avanza/Xenia)", unit: "pcs", cost: 35000, sell: 55000, stock: 20, reorder: 8 },
    { sku: "FLT-UDARA", name: "Filter udara", unit: "pcs", cost: 60000, sell: 95000, stock: 9, reorder: 4 },
    { sku: "FLT-KABIN", name: "Filter kabin AC", unit: "pcs", cost: 60000, sell: 95000, stock: 7, reorder: 3 },
    { sku: "KMP-DPN", name: "Kampas rem depan", unit: "set", cost: 180000, sell: 260000, stock: 6, reorder: 3 },
    { sku: "BUSI-DENSO", name: "Busi Denso Iridium", unit: "pcs", cost: 65000, sell: 95000, stock: 24, reorder: 8 },
    { sku: "AKI-NS40", name: "Aki GS Hybrid NS40", unit: "pcs", cost: 650000, sell: 780000, stock: 3, reorder: 2 },
    { sku: "MINYAK-REM", name: "Minyak rem DOT 3", unit: "botol", cost: 30000, sell: 45000, stock: 12, reorder: 4 },
    { sku: "COOLANT", name: "Air radiator / coolant 1L", unit: "botol", cost: 25000, sell: 40000, stock: 3, reorder: 5 },
    { sku: "WIPER", name: "Wiper blade (sepasang)", unit: "set", cost: 60000, sell: 95000, stock: 8, reorder: 3 },
    { sku: "BAN-18565", name: "Ban 185/65 R15", unit: "pcs", cost: 750000, sell: 880000, stock: 6, reorder: 4 },
    { sku: "FREON", name: "Freon AC R134a", unit: "kaleng", cost: 120000, sell: 180000, stock: 9, reorder: 3 },
    { sku: "ATF", name: "Oli transmisi ATF 1L", unit: "botol", cost: 85000, sell: 115000, stock: 10, reorder: 4 },
  ],
  jobs: [
    {
      note: "Ganti oli",
      weight: 25,
      lines: () => [{ labor: "Jasa ganti oli", price: 25000 }, { part: "OLI-HX7" }, { part: "FLT-OLI" }],
    },
    {
      note: "Servis berkala 10.000 km",
      weight: 22,
      lines: () => [
        { labor: "Jasa servis berkala", price: 150000 },
        { part: "OLI-HX7" },
        { part: "FLT-OLI" },
        { part: "FLT-UDARA", chance: 0.4 },
        { part: "COOLANT", chance: 0.25 },
      ],
    },
    {
      note: "Mesin brebet, tune up",
      weight: 10,
      lines: () => [{ labor: "Jasa tune up", price: 200000 }, { part: "BUSI-DENSO", qty: 4 }, { part: "FLT-UDARA", chance: 0.5 }],
    },
    {
      note: "Rem bunyi",
      weight: 12,
      lines: () => [{ labor: "Jasa ganti kampas rem", price: 75000 }, { part: "KMP-DPN" }, { part: "MINYAK-REM", chance: 0.5 }],
    },
    {
      note: "AC kurang dingin",
      weight: 12,
      lines: () => [{ labor: "Jasa servis AC", price: 250000 }, { part: "FREON" }, { part: "FLT-KABIN", chance: 0.6 }],
    },
    {
      note: "Setir getar, spooring",
      weight: 8,
      lines: () => [{ labor: "Spooring + balancing", price: 150000 }, { part: "BAN-18565", qty: 2, chance: 0.4 }],
    },
    {
      note: "Aki soak",
      weight: 5,
      lines: () => [{ labor: "Jasa ganti aki", price: 25000 }, { part: "AKI-NS40" }],
    },
    {
      note: "Ganti oli transmisi matic",
      weight: 4,
      forMatic: true,
      lines: () => [{ labor: "Jasa kuras oli transmisi", price: 100000 }, { part: "ATF", qty: 4 }],
    },
    {
      note: "Wiper seret",
      weight: 3,
      lines: () => [{ part: "WIPER" }],
    },
  ],
  expenses: [
    { category: "rent", description: "Sewa tempat", amount: 6000000, day: 1 },
    { category: "utilities", description: "Listrik PLN", amount: 1450000, day: 5 },
    { category: "utilities", description: "Internet + air", amount: 520000, day: 6 },
    { category: "supplies", description: "Belanja oli & filter (grosir)", amount: 7800000, day: 3 },
    { category: "supplies", description: "Belanja kampas, freon, aki", amount: 4300000, day: 16 },
    { category: "other", description: "Iuran keamanan + kebersihan", amount: 200000, day: 10 },
    { category: "salary", description: "Gaji 3 mekanik + kasir", amount: 11500000, day: 28 },
  ],
};

function motorOil(v: Vehicle): string {
  if (v.brand === "Honda") return v.matic ? "OLI-MPX2" : "OLI-MPX1";
  if (v.brand === "Yamaha" && v.matic) return "OLI-YML";
  return "OLI-FED";
}

function vbelt(v: Vehicle): string {
  if (["Beat", "Scoopy", "Mio M3", "Fazzio", "Nex II"].includes(v.model)) return "VBELT-BEAT";
  if (["NMAX", "Aerox 155"].includes(v.model)) return "VBELT-NMAX";
  return "VBELT-VARIO";
}

const firstNames = [
  "Budi", "Ahmad", "Siti", "Hendri", "Lina", "Andi", "Yusuf", "Fitri", "Agus", "Dewi",
  "Ivan", "Rina", "Hasan", "Nurul", "Wawan", "Teddy", "Susanti", "Rizky", "Dimas", "Eko",
  "Maya", "Johan", "Ani", "Iwan", "Selvi", "Ahiong", "Afung", "Mei Lan", "Rahmat", "Yohanes",
  "Dayang", "Uray", "Syarif", "Gusti", "Antonius", "Lukas", "Rosita", "Hartono", "Sri", "Bayu",
  "Fransiska", "Kevin", "Stefani", "Ardi", "Ilham", "Putri", "Taufik", "Yanti",
];
const lastNames = ["", "", "", "Santoso", "Wijaya", "Pratama", "Saputra", "Hidayat", "Kurniawan", "Lim", "Tan", "Gunawan"];

// Deterministic, so two runs on the same day show the same shop.
function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const WIB_MS = 7 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;
const DAYS_BACK = 45;

/** UTC instant of `hour:minute` WIB on the WIB day `daysAgo` before today. */
function wibAt(now: Date, daysAgo: number, minutesIntoDay: number): Date {
  const wibMidnight = Math.floor((now.getTime() + WIB_MS) / DAY_MS) * DAY_MS - WIB_MS;
  return new Date(wibMidnight - daysAgo * DAY_MS + minutesIntoDay * 60 * 1000);
}

function wibDate(d: Date): string {
  return new Date(d.getTime() + WIB_MS).toISOString().slice(0, 10);
}

function askHidden(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    process.stdout.write(prompt);
    (rl as unknown as { _writeToOutput: (s: string) => void })._writeToOutput = () => {};
    rl.question("", (answer) => {
      rl.close();
      process.stdout.write("\n");
      resolve(answer.trim());
    });
  });
}

async function insertAll(supabase: SupabaseClient, table: string, rows: object[]) {
  for (let i = 0; i < rows.length; i += 500) {
    const { error } = await supabase.from(table).insert(rows.slice(i, i + 500));
    if (error) throw new Error(`${table}: ${error.message}`);
  }
}

// Children first: several foreign keys are `on delete restrict`, so a bare
// delete of the shop would trip over its own tickets.
async function removeShop(supabase: SupabaseClient, shopId: string) {
  for (const table of [
    "notifications",
    "ticket_attachments",
    "payments",
    "ticket_items",
    "appointments",
    "stock_movements",
    "expenses",
    "service_tickets",
    "vehicles",
    "customers",
    "inventory_items",
    "staff",
  ]) {
    const { error } = await supabase.from(table).delete().eq("shop_id", shopId);
    if (error) throw new Error(`clear ${table}: ${error.message}`);
  }
  const { error } = await supabase.from("shops").delete().eq("id", shopId);
  if (error) throw new Error(`clear shop: ${error.message}`);
}

async function main() {
  const args = process.argv.slice(2);
  const kindArg = args[args.indexOf("--kind") + 1];
  if (!args.includes("--kind") || (kindArg !== "motor" && kindArg !== "mobil")) {
    console.error("Pass --kind motor or --kind mobil.");
    process.exit(1);
  }
  const kind = kindArg as Kind;
  const profile = kind === "motor" ? motor : mobil;
  const shopName = process.env.DEMO_SHOP_NAME?.trim() || profile.shopName;

  const url = process.env.DEMO_SUPABASE_URL;
  if (!url) {
    console.error("Set DEMO_SUPABASE_URL to the demo project's API URL.");
    process.exit(1);
  }
  if (url.includes(PROD_REF)) {
    console.error("That is the real shop's database. Demo data goes in a separate project.");
    process.exit(1);
  }

  const pin = process.env.DEMO_PIN ?? "";
  if (!/^\d{4,8}$/.test(pin)) {
    console.error("Set DEMO_PIN to 4-8 digits — the PIN the prospect types to log in.");
    process.exit(1);
  }

  const key =
    process.env.DEMO_SUPABASE_SERVICE_ROLE_KEY ||
    (await askHidden(`Supabase service key for ${url} (input hidden): `));
  if (!key) {
    console.error("No key given, nothing changed.");
    process.exit(1);
  }

  const supabase = createClient(url, key);
  const now = new Date();
  const random = rng(kind === "motor" ? 20260923 : 19450817);
  const between = (lo: number, hi: number) => lo + Math.floor(random() * (hi - lo + 1));
  const pick = <T>(xs: T[]) => xs[Math.floor(random() * xs.length)];

  // The login matches a PIN across every shop, so one already in use by
  // another demo shop would make both refuse to log in.
  const { data: holders, error: pinError } = await supabase.rpc("verify_staff_pin", {
    p_pin: pin,
    p_client: "seed-demo",
  });
  if (pinError) throw new Error(`PIN check: ${pinError.message}`);
  const holder = (holders ?? [])[0] as { shop_id: string | null; locked: boolean } | undefined;

  const { data: existing } = await supabase.from("shops").select("id").eq("name", shopName);
  const existingIds = (existing ?? []).map((s) => s.id as string);

  if (holder?.shop_id && !existingIds.includes(holder.shop_id)) {
    console.error(`PIN ${pin} already belongs to another shop in this database. Pick a different DEMO_PIN.`);
    process.exit(1);
  }

  for (const id of existingIds) {
    await removeShop(supabase, id);
    console.log(`Removed the previous "${shopName}"`);
  }

  // Shop and staff
  const shopId = randomUUID();
  await insertAll(supabase, "shops", [{ id: shopId, name: shopName, address: profile.address, phone: profile.phone }]);

  const ownerId = randomUUID();
  const cashierId = randomUUID();
  const mechanicId = randomUUID();
  await insertAll(supabase, "staff", [
    { id: ownerId, shop_id: shopId, name: profile.staff.owner, role: "owner", pin: null },
    { id: cashierId, shop_id: shopId, name: profile.staff.cashier, role: "cashier", pin: null },
    { id: mechanicId, shop_id: shopId, name: profile.staff.mechanic, role: "mechanic", pin: null },
  ]);
  const { error: setPinError } = await supabase.rpc("set_staff_pin", { p_staff_id: ownerId, p_pin: pin });
  if (setPinError) throw new Error(`set PIN: ${setPinError.message}`);

  // Parts
  const parts = profile.parts.map((p) => ({ ...p, id: randomUUID(), used: 0 }));
  const partBySku = new Map(parts.map((p) => [p.sku, p]));

  // Customers, each with one vehicle. Pontianak plates start with KB.
  const customerCount = kind === "motor" ? 70 : 40;
  const customers = Array.from({ length: customerCount }, (_, i) => {
    const name = `${pick(firstNames)} ${pick(lastNames)}`.trim();
    const letters = String.fromCharCode(65 + between(0, 25)) + String.fromCharCode(65 + between(0, 25));
    return {
      id: randomUUID(),
      name,
      phone: random() < 0.85 ? `08${pick(["12", "13", "21", "52", "53", "57"])}${String(between(10000000, 99999999))}` : null,
      vehicleId: randomUUID(),
      vehicle: pick(profile.vehicles),
      plate: `KB ${between(1000, 6999)} ${letters}`,
      year: between(2014, 2025),
      visits: 0,
      spent: 0,
      first: null as Date | null,
      last: null as Date | null,
      index: i,
    };
  });
  // A few regulars carry the numbers, the way real shops' books look.
  const regulars = customers.slice(0, Math.ceil(customerCount / 4));

  const tickets: object[] = [];
  const items: object[] = [];
  const payments: object[] = [];
  const movements: object[] = [];
  let readyToday: { ticketId: string; customer: (typeof customers)[number]; total: number } | null = null;

  const nowMinutes = Math.floor(((now.getTime() + WIB_MS) % DAY_MS) / 60000);

  for (let daysAgo = DAYS_BACK; daysAgo >= 0; daysAgo--) {
    const day = wibAt(now, daysAgo, 0);
    const sunday = new Date(day.getTime() + WIB_MS).getUTCDay() === 0;
    let count = between(...profile.perDay);
    if (sunday) count = Math.floor(count / 2);

    for (let n = 0; n < count; n++) {
      const openAt = between(8 * 60, 16 * 60 + 30);
      if (daysAgo === 0 && openAt > nowMinutes) continue;

      const customer = random() < 0.45 ? pick(regulars) : pick(customers);
      const vehicle = customer.vehicle;
      const jobs = profile.jobs.filter((j) => j.forMatic === undefined || j.forMatic === vehicle.matic);
      const totalWeight = jobs.reduce((s, j) => s + j.weight, 0);
      let roll = random() * totalWeight;
      const job = jobs.find((j) => (roll -= j.weight) < 0) ?? jobs[0];

      const createdAt = wibAt(now, daysAgo, openAt);
      const doneAt = new Date(createdAt.getTime() + between(...profile.workMinutes) * 60000);
      const finished = doneAt.getTime() < now.getTime();
      const status = finished ? "completed" : random() < 0.5 ? "open" : "in_progress";

      const ticketId = randomUUID();
      tickets.push({
        id: ticketId,
        shop_id: shopId,
        customer_id: customer.id,
        vehicle_id: customer.vehicleId,
        staff_id: cashierId,
        status,
        notes: job.note,
        created_at: createdAt.toISOString(),
        completed_at: finished ? doneAt.toISOString() : null,
      });

      let total = 0;
      for (const line of job.lines(vehicle)) {
        if (line.chance !== undefined && random() >= line.chance) continue;
        const qty = line.qty ?? 1;
        if (line.labor) {
          items.push({
            shop_id: shopId,
            ticket_id: ticketId,
            description: line.labor,
            quantity: qty,
            unit_price: line.price,
            created_at: createdAt.toISOString(),
          });
          total += (line.price ?? 0) * qty;
        } else if (line.part) {
          const part = partBySku.get(line.part)!;
          items.push({
            shop_id: shopId,
            ticket_id: ticketId,
            inventory_item_id: part.id,
            description: part.name,
            quantity: qty,
            unit_price: part.sell,
            created_at: createdAt.toISOString(),
          });
          total += part.sell * qty;
          if (finished) {
            part.used += qty;
            movements.push({
              shop_id: shopId,
              inventory_item_id: part.id,
              staff_id: cashierId,
              change_qty: -qty,
              reason: "ticket_deduct",
              reference_id: ticketId,
              created_at: doneAt.toISOString(),
            });
          }
        }
      }

      if (finished) {
        payments.push({
          shop_id: shopId,
          ticket_id: ticketId,
          staff_id: cashierId,
          amount: total,
          method: pick(["cash", "cash", "cash", "qris", "qris", "transfer"]),
          paid_at: doneAt.toISOString(),
        });
        customer.visits += 1;
        customer.spent += total;
        customer.first ??= createdAt;
        customer.last = doneAt;
        if (daysAgo === 0) readyToday = { ticketId, customer, total };
      }
    }
  }

  // Whatever the hour, the prospect should see bikes on the floor right now.
  for (const [minutesAgo, status, jobIndex] of [
    [35, "in_progress", 1],
    [12, "open", 0],
    [4, "open", 2],
  ] as const) {
    const customer = pick(customers);
    const jobs = profile.jobs.filter((j) => j.forMatic === undefined || j.forMatic === customer.vehicle.matic);
    const job = jobs[jobIndex % jobs.length];
    const ticketId = randomUUID();
    const createdAt = new Date(now.getTime() - minutesAgo * 60000);
    tickets.push({
      id: ticketId,
      shop_id: shopId,
      customer_id: customer.id,
      vehicle_id: customer.vehicleId,
      staff_id: cashierId,
      status,
      notes: job.note,
      created_at: createdAt.toISOString(),
    });
    for (const line of job.lines(customer.vehicle)) {
      if (line.chance !== undefined && line.chance < 0.5) continue;
      const part = line.part ? partBySku.get(line.part)! : null;
      items.push({
        shop_id: shopId,
        ticket_id: ticketId,
        inventory_item_id: part?.id ?? null,
        description: part?.name ?? line.labor,
        quantity: line.qty ?? 1,
        unit_price: part?.sell ?? line.price,
        created_at: createdAt.toISOString(),
      });
    }
  }

  const waPhone = process.env.DEMO_WA_PHONE?.trim();
  if (readyToday && waPhone) readyToday.customer.phone = waPhone;

  await insertAll(
    supabase,
    "customers",
    customers.map((c) => ({
      id: c.id,
      shop_id: shopId,
      name: c.name,
      phone: c.phone,
      total_visits: c.visits,
      total_spent: c.spent,
      loyalty_points: Math.floor(c.spent / 1000),
      first_visit: c.first?.toISOString() ?? null,
      last_visit: c.last?.toISOString() ?? null,
      created_at: (c.first ?? now).toISOString(),
    })),
  );
  await insertAll(
    supabase,
    "vehicles",
    customers.map((c) => ({
      id: c.vehicleId,
      shop_id: shopId,
      customer_id: c.id,
      plate_number: c.plate,
      brand: c.vehicle.brand,
      model: c.vehicle.model,
      year: c.year,
    })),
  );

  // Shelf stock is what is left today; the opening purchase is whatever that
  // plus six weeks of jobs adds up to, so the movement log balances.
  const openedAt = wibAt(now, DAYS_BACK + 1, 9 * 60).toISOString();
  await insertAll(
    supabase,
    "inventory_items",
    parts.map((p) => ({
      id: p.id,
      shop_id: shopId,
      sku: p.sku,
      name: p.name,
      unit: p.unit,
      cost_price: p.cost,
      sell_price: p.sell,
      stock_qty: p.stock,
      reorder_point: p.reorder,
      created_at: openedAt,
    })),
  );
  await insertAll(
    supabase,
    "stock_movements",
    parts
      .map((p) => ({
        shop_id: shopId,
        inventory_item_id: p.id,
        staff_id: ownerId,
        change_qty: p.stock + p.used,
        reason: "purchase",
        created_at: openedAt,
      }))
      .concat(movements as never[]),
  );

  await insertAll(supabase, "service_tickets", tickets);
  await insertAll(supabase, "ticket_items", items);
  await insertAll(supabase, "payments", payments);

  // Expenses for last month and this month, up to today.
  const today = wibDate(now);
  const [y, m] = today.split("-").map(Number);
  const expenses: object[] = [];
  for (const [year, month] of [m === 1 ? [y - 1, 12] : [y, m - 1], [y, m]]) {
    for (const e of profile.expenses) {
      const date = `${year}-${String(month).padStart(2, "0")}-${String(e.day).padStart(2, "0")}`;
      if (date > today) continue;
      expenses.push({
        shop_id: shopId,
        staff_id: ownerId,
        category: e.category,
        description: e.description,
        amount: e.amount,
        spent_at: date,
      });
    }
  }
  await insertAll(supabase, "expenses", expenses);

  // Bookings for later today and the next two days.
  const bookings: object[] = [];
  for (const [daysAhead, minutes, note] of [
    [0, 15 * 60, profile.jobs[1].note],
    [0, 16 * 60 + 30, profile.jobs[0].note],
    [-1, 9 * 60, profile.jobs[2].note],
    [-1, 10 * 60 + 30, profile.jobs[1].note],
    [-1, 14 * 60, profile.jobs[3].note],
    [-2, 9 * 60 + 30, profile.jobs[0].note],
  ] as const) {
    const at = wibAt(now, daysAhead, minutes);
    if (at.getTime() < now.getTime()) continue;
    const c = pick(customers);
    bookings.push({
      shop_id: shopId,
      staff_id: cashierId,
      customer_name: c.name,
      customer_phone: c.phone,
      plate_number: c.plate,
      brand: c.vehicle.brand,
      model: c.vehicle.model,
      scheduled_at: at.toISOString(),
      notes: note,
    });
  }
  await insertAll(supabase, "appointments", bookings);

  // The bell should have something in it when the prospect looks.
  const notifications: object[] = parts
    .filter((p) => p.stock <= p.reorder)
    .map((p) => ({
      shop_id: shopId,
      type: "low_stock",
      title: "Stok barang rendah",
      message: `${p.name} tersisa ${p.stock} unit (batas: ${p.reorder})`,
      data: { item_id: p.id, current_qty: p.stock, reorder_point: p.reorder },
    }));
  if (readyToday) {
    const phone = readyToday.customer.phone;
    const total = formatIDR(readyToday.total);
    const message = `Halo ${readyToday.customer.name}, kendaraan ${readyToday.customer.plate} sudah selesai diservis di ${shopName}. Total: ${total}. Terima kasih!`;
    const digits = phone?.replace(/\D/g, "") ?? "";
    const waLink = digits
      ? `https://wa.me/${digits.startsWith("0") ? `62${digits.slice(1)}` : digits}?text=${encodeURIComponent(message)}`
      : null;
    notifications.push({
      shop_id: shopId,
      type: "ticket_completed",
      title: "Kabari customer",
      message: waLink
        ? `${readyToday.customer.name} — ${kind} selesai, kirim WA sekarang`
        : `${readyToday.customer.name} — ${kind} selesai, nomor WA belum ada`,
      data: { ticket_id: readyToday.ticketId, wa_link: waLink },
    });
  }
  await insertAll(supabase, "notifications", notifications);

  const revenue = payments.reduce((s, p) => s + (p as { amount: number }).amount, 0);
  console.log(`\n✓ "${shopName}" (${kind}) is ready`);
  console.log(`  ${customers.length} customers, ${tickets.length} tickets, ${parts.length} parts`);
  console.log(`  ${formatIDR(revenue)} taken over ${DAYS_BACK + 1} days`);
  console.log(`  Log in as ${profile.staff.owner} (owner) with DEMO_PIN`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
