#!/usr/bin/env node
/**
 * Serves the offline pitch demo (demo/bengkel-motor.html) on the local network,
 * so a phone on the same Wi-Fi can open it. No database, no deploy: the page
 * builds its own sample shop in the browser.
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
  if (req.url !== "/" && !req.url?.startsWith("/?")) {
    res.writeHead(302, { Location: "/" }).end();
    return;
  }
  // Read on every request, so an edited page shows on the next reload.
  const html = await readFile(PAGE);
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" }).end(html);
}).listen(PORT, "0.0.0.0", () => {
  const lan = Object.values(networkInterfaces())
    .flat()
    .filter((i) => i && i.family === "IPv4" && !i.internal)
    .map((i) => `http://${i.address}:${PORT}`);

  console.log("\nDemo BengkelOS Motor jalan (PIN 2468)\n");
  console.log(`  Laptop:  http://localhost:${PORT}`);
  for (const url of lan) console.log(`  HP:      ${url}   (HP harus di Wi-Fi yang sama)`);
  console.log("\nCtrl+C untuk berhenti.\n");
});
