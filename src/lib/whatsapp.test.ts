import { test } from "node:test";
import assert from "node:assert/strict";
import { buildWhatsAppLink } from "./whatsapp";

test("a local 0-prefixed number becomes a 62 number", () => {
  assert.equal(
    buildWhatsAppLink("0852-4509-0297", "halo"),
    "https://wa.me/6285245090297?text=halo",
  );
});

test("a number already in 62 form is left alone", () => {
  assert.equal(buildWhatsAppLink("+62 812 3456 7890", "halo"), "https://wa.me/6281234567890?text=halo");
});

test("the message is url-encoded", () => {
  assert.equal(
    buildWhatsAppLink("08123456789", "mobil siap & bisa diambil"),
    "https://wa.me/628123456789?text=mobil%20siap%20%26%20bisa%20diambil",
  );
});

test("a missing or digitless phone yields no link", () => {
  assert.equal(buildWhatsAppLink(null, "halo"), null);
  assert.equal(buildWhatsAppLink("", "halo"), null);
  assert.equal(buildWhatsAppLink("-", "halo"), null);
});
