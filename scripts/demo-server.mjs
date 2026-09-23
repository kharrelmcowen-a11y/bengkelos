#!/usr/bin/env node
/**
 * Serves the offline pitch demo (demo/bengkel-motor.html) to a phone. No
 * database, no deploy: the page builds its own sample shop in the browser.
 *
 * The phone and laptop only need to share a network, and on mobile data that
 * network is the phone's own hotspot: turn it on, join it from the laptop, run
 * this. /unduh hands the phone a copy of the page, which then opens from the
 * phone's storage with no laptop at all.
 *
 * Usage:  npm run demo            (port 4173)
 *         PORT=8080 npm run demo
 */

import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { networkInterfaces } from "node:os";

const PORT = Number(process.env.PORT) || 4173;
const PAGE = new URL("../demo/bengkel-motor.html", import.meta.url);

createServer(async (req, res) => {
  const path = (req.url ?? "/").split("?")[0];
  if (path !== "/" && path !== "/unduh") {
    res.writeHead(302, { Location: "/" }).end();
    return;
  }
  // Read on every request, so an edited page shows on the next reload.
  const html = await readFile(PAGE);
  const headers = { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" };
  if (path === "/unduh") headers["Content-Disposition"] = 'attachment; filename="bengkelos-demo.html"';
  res.writeHead(200, headers).end(html);
}).listen(PORT, "0.0.0.0", () => {
  const lan = Object.values(networkInterfaces())
    .flat()
    .filter((i) => i && i.family === "IPv4" && !i.internal)
    .map((i) => `http://${i.address}:${PORT}`);

  console.log("\nDemo BengkelOS Motor jalan (PIN 2468)\n");
  console.log(`  Laptop:  http://localhost:${PORT}`);
  if (lan.length) {
    for (const url of lan) console.log(`  HP:      ${url}        simpan ke HP: ${url}/unduh`);
    console.log("\n  HP pakai data seluler? Nyalakan hotspot HP, sambungkan laptop ke");
    console.log("  hotspot itu, lalu jalankan ulang perintah ini.");
  } else {
    console.log("\n  Laptop belum tersambung ke jaringan mana pun. Nyalakan hotspot HP,");
    console.log("  sambungkan laptop ke hotspot itu, lalu jalankan ulang perintah ini.");
  }
  console.log("\nCtrl+C untuk berhenti.\n");
});
