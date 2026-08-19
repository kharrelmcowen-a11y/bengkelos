import { test } from "node:test";
import assert from "node:assert/strict";
import { wibDayWindow, formatWibTime } from "./time";

test("the window covers the WIB day the moment falls in", () => {
  // 23:00 UTC is already 06:00 the next morning in Jakarta.
  const { start, end } = wibDayWindow(new Date("2026-08-19T23:00:00Z"));
  assert.equal(start.toISOString(), "2026-08-19T17:00:00.000Z"); // 2026-08-20 00:00 WIB
  assert.equal(end.toISOString(), "2026-08-20T17:00:00.000Z");
});

test("a late-evening WIB moment stays on the same WIB day", () => {
  const { start, end } = wibDayWindow(new Date("2026-08-20T16:30:00Z")); // 23:30 WIB
  assert.equal(start.toISOString(), "2026-08-19T17:00:00.000Z");
  assert.equal(end.toISOString(), "2026-08-20T17:00:00.000Z");
});

test("formatWibTime renders the Jakarta clock time", () => {
  assert.equal(formatWibTime("2026-08-20T02:15:00Z"), "09.15");
});
