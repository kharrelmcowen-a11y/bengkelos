import { test } from "node:test";
import assert from "node:assert/strict";
import { gateOpensWithoutToken, isPublicPath, secretsMatch } from "./access";

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

test("a missing token closes the gate in production and opens it elsewhere", () => {
  assert.equal(gateOpensWithoutToken("production"), false);
  assert.equal(gateOpensWithoutToken("development"), true);
  assert.equal(gateOpensWithoutToken("test"), true);
  assert.equal(gateOpensWithoutToken(undefined), true);
});

test("real pages do not bypass the gate", () => {
  assert.equal(isPublicPath("/dashboard"), false);
  assert.equal(isPublicPath("/login"), false);
  assert.equal(isPublicPath("/api/notifications"), false);
});
