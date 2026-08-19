import { test } from "node:test";
import assert from "node:assert/strict";
import { cogsFromMovements, pickLowStock, stockValue } from "./inventory";

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

test("stockValue prices the catalog at cost", () => {
  assert.equal(
    stockValue([
      { cost_price: 50_000, stock_qty: 3 },
      { cost_price: 20_000, stock_qty: 0 },
    ]),
    150_000,
  );
});

test("cogsFromMovements sums every ticket deduction, not just the last one", () => {
  const items = [
    { id: "a", cost_price: 10_000, stock_qty: 5, reorder_point: 2 },
    { id: "b", cost_price: 4_000, stock_qty: 5, reorder_point: 2 },
  ];
  const movements = [
    { inventory_item_id: "a", change_qty: -2, reason: "ticket_deduct" },
    { inventory_item_id: "b", change_qty: -3, reason: "ticket_deduct" },
    { inventory_item_id: "a", change_qty: 10, reason: "purchase" },
  ];
  assert.equal(cogsFromMovements(movements, items), 32_000);
});

test("cogsFromMovements ignores a movement whose item is gone", () => {
  const movements = [{ inventory_item_id: null, change_qty: -4, reason: "ticket_deduct" }];
  assert.equal(cogsFromMovements(movements, []), 0);
});
