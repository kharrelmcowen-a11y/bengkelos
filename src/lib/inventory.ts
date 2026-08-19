export type StockLevel = {
  stock_qty: number;
  reorder_point: number;
};

export function isLowStock(item: StockLevel): boolean {
  return item.stock_qty <= item.reorder_point;
}

// PostgREST cannot compare two columns in a filter, so low stock is picked in JS.
export function pickLowStock<T extends StockLevel>(items: T[], limit = 5): T[] {
  return items
    .filter(isLowStock)
    .sort((a, b) => a.stock_qty - b.stock_qty)
    .slice(0, limit);
}

export type PricedItem = StockLevel & { id: string; cost_price: number };
export type StockMovement = { inventory_item_id: string | null; change_qty: number; reason: string };

export function stockValue(items: Pick<PricedItem, "cost_price" | "stock_qty">[]): number {
  return items.reduce((sum, item) => sum + item.cost_price * item.stock_qty, 0);
}

// Cost of the parts a period's tickets consumed, valued at their cost price.
export function cogsFromMovements(movements: StockMovement[], items: PricedItem[]): number {
  const costById = new Map(items.map((item) => [item.id, item.cost_price]));
  return movements
    .filter((movement) => movement.reason === "ticket_deduct")
    .reduce((sum, movement) => {
      const cost = costById.get(movement.inventory_item_id ?? "") ?? 0;
      return sum + Math.abs(movement.change_qty) * cost;
    }, 0);
}
