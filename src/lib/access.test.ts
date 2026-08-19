import { test } from "node:test";
import assert from "node:assert/strict";
import { isPublicPath, secretsMatch } from "./access";

test("secretsMatch accepts an identical token", () => {
  assert.equal(secretsMatch("abc123", "abc123"), true);
});

test("secretsMatch rejects a different or shorter token", () => {
  assert.equal(secretsMatch("abc123", "abc124"), false);
  assert.equal(secretsMatch("abc123", "abc12"), false);
  assert.equal(secretsMatch("", "abc"), false);
});

test("the cron route and static assets bypass the gate", () => {
  assert.equal(isPublicPath("/api/cron/appointment-reminders"), true);
  assert.equal(isPublicPath("/_next/static/chunk.js"), true);
  assert.equal(isPublicPath("/favicon.ico"), true);
});

test("real pages do not bypass the gate", () => {
  assert.equal(isPublicPath("/dashboard"), false);
  assert.equal(isPublicPath("/login"), false);
  assert.equal(isPublicPath("/api/notifications"), false);
});
