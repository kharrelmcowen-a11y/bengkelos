import { test } from "node:test";
import assert from "node:assert/strict";
import { sanitizeFileName } from "./attachments";

test("sanitizeFileName keeps a normal name intact", () => {
  assert.equal(sanitizeFileName("foto-depan.jpg"), "foto-depan.jpg");
});

test("sanitizeFileName cannot escape the ticket folder", () => {
  assert.equal(sanitizeFileName("../../etc/passwd"), "passwd");
  assert.equal(sanitizeFileName("..\\..\\windows\\system32"), "system32");
  assert.equal(sanitizeFileName("a/b/c.pdf"), "c.pdf");
});

test("sanitizeFileName replaces characters that would break a storage key", () => {
  assert.equal(sanitizeFileName("nota bengkel (1).pdf"), "nota_bengkel_1_.pdf");
});

test("sanitizeFileName always returns a usable name", () => {
  assert.equal(sanitizeFileName("///"), "file");
  assert.equal(sanitizeFileName("!!!"), "file");
  assert.ok(sanitizeFileName("x".repeat(500)).length <= 120);
});
