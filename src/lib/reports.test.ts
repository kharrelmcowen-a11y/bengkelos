import { test } from "node:test";
import assert from "node:assert/strict";
import { busiestItemId, countUnique, growthPercent, sumAmounts, topServices } from "./reports";

test("growthPercent compares against the previous period", () => {
  assert.equal(growthPercent(150, 100), 50);
  assert.equal(growthPercent(50, 100), -50);
});

test("growthPercent reads zero when there is no previous period to compare", () => {
  assert.equal(growthPercent(150, 0), 0);
});

test("sumAmounts copes with numeric columns arriving as strings", () => {
  assert.equal(sumAmounts([{ amount: 100 }, { amount: "250" as unknown as number }]), 350);
});

test("countUnique counts each customer once", () => {
  const rows = [{ customer_id: "a" }, { customer_id: "b" }, { customer_id: "a" }];
  assert.equal(countUnique(rows, (row) => row.customer_id), 2);
});

test("topServices merges lines by description and ranks by quantity", () => {
  const lines = [
    { description: "Ganti oli", quantity: 2, unit_price: 100_000 },
    { description: "Tune up", quantity: 1, unit_price: 400_000 },
    { description: "Ganti oli", quantity: 3, unit_price: 100_000 },
  ];
  assert.deepEqual(topServices(lines), [
    { description: "Ganti oli", count: 5, revenue: 500_000 },
    { description: "Tune up", count: 1, revenue: 400_000 },
  ]);
});

test("busiestItemId counts movements in both directions", () => {
  const movements = [
    { inventory_item_id: "a", change_qty: -2 },
    { inventory_item_id: "b", change_qty: 4 },
    { inventory_item_id: "a", change_qty: -3 },
    { inventory_item_id: null, change_qty: -99 },
  ];
  assert.equal(busiestItemId(movements), "a");
});

test("busiestItemId returns null when nothing moved", () => {
  assert.equal(busiestItemId([]), null);
});
