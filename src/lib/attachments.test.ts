import { test } from "node:test";
import assert from "node:assert/strict";
import { attachmentStoragePath, sanitizeFileName } from "./attachments";

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

test("attachmentStoragePath keeps a stored key as is", () => {
  assert.equal(attachmentStoragePath("ticket-uuid/1700-foto.jpg"), "ticket-uuid/1700-foto.jpg");
});

test("attachmentStoragePath recovers the key from a legacy public URL", () => {
  assert.equal(
    attachmentStoragePath(
      "https://x.supabase.co/storage/v1/object/public/ticket-attachments/ticket-uuid/1700-foto.jpg",
    ),
    "ticket-uuid/1700-foto.jpg",
  );
});
