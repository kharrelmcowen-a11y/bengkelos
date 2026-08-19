import { test } from "node:test";
import assert from "node:assert/strict";
import { pickLowStock } from "./inventory";

test("pickLowStock keeps only items at or below their reorder point", () => {
  const items = [
    { name: "oli", stock_qty: 2, reorder_point: 5 },
    { name: "busi", stock_qty: 9, reorder_point: 4 },
    { name: "filter", stock_qty: 3, reorder_point: 3 },
  ];
  assert.deepEqual(
    pickLowStock(items).map((i) => i.name),
    ["oli", "filter"],
  );
});

test("pickLowStock ignores a low absolute stock with a zero reorder point", () => {
  const items = [{ name: "kampas", stock_qty: 1, reorder_point: 0 }];
  assert.deepEqual(pickLowStock(items), []);
});

test("pickLowStock caps the result at the limit", () => {
  const items = Array.from({ length: 8 }, (_, i) => ({ stock_qty: i, reorder_point: 10 }));
  assert.equal(pickLowStock(items).length, 5);
});
