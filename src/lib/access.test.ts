import { test } from "node:test";
import assert from "node:assert/strict";
import {
  ACCESS_COOKIE_MAX_AGE,
  accessCookieOptions,
  gateOpensWithoutToken,
  isPublicPath,
  secretsMatch,
} from "./access";

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

test("every cookie the gate hands out carries the full year", () => {
  // Both the first ?k= trip and every re-stamp after it read from here, so a
  // request that renews the cookie can never shorten it by accident.
  const options = accessCookieOptions();
  assert.equal(options.maxAge, ACCESS_COOKIE_MAX_AGE);
  assert.equal(options.httpOnly, true);
  assert.equal(options.sameSite, "lax");
  assert.equal(options.path, "/");
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
