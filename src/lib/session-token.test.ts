import { test } from "node:test";
import assert from "node:assert/strict";

import { encodeSession, decodeSession, SESSION_MAX_AGE_SECONDS } from "./session-token";

// The secret is read per call, not at import time, so setting it here is enough.
process.env.SESSION_SECRET ??= "test-secret";

const session = {
  staffId: "staff-1",
  shopId: "shop-1",
  name: "Owen",
  role: "owner" as const,
};

test("a fresh token round-trips", () => {
  assert.deepEqual(decodeSession(encodeSession(session)), session);
});

test("a token past its expiry is rejected", () => {
  const issuedAt = Date.now();
  const token = encodeSession(session, issuedAt);
  const afterExpiry = issuedAt + SESSION_MAX_AGE_SECONDS * 1000 + 1;
  assert.equal(decodeSession(token, afterExpiry), null);
});

test("a tampered payload is rejected", () => {
  const [payload, signature] = encodeSession(session).split(".");
  const forged = Buffer.from(
    JSON.stringify({ ...session, role: "owner", exp: Date.now() + 1000 }),
  ).toString("base64url");
  assert.notEqual(forged, payload);
  assert.equal(decodeSession(`${forged}.${signature}`), null);
});

test("a malformed token is rejected", () => {
  assert.equal(decodeSession("garbage"), null);
  assert.equal(decodeSession(""), null);
});
