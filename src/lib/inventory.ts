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
