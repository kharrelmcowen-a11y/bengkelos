// Period-over-period math for the reports page, kept pure so it can be tested
// without a database.

export function growthPercent(current: number, previous: number): number {
  return previous > 0 ? ((current - previous) / previous) * 100 : 0;
}

export function sumAmounts(rows: { amount: number }[]): number {
  return rows.reduce((sum, row) => sum + Number(row.amount), 0);
}

export function countUnique<T>(rows: T[], key: (row: T) => string): number {
  return new Set(rows.map(key)).size;
}

export type ServiceLine = { description: string; quantity: number; unit_price: number };
export type ServiceTotal = { description: string; count: number; revenue: number };

export function topServices(lines: ServiceLine[], limit = 5): ServiceTotal[] {
  const totals = new Map<string, ServiceTotal>();
  for (const line of lines) {
    const existing = totals.get(line.description) ?? {
      description: line.description,
      count: 0,
      revenue: 0,
    };
    totals.set(line.description, {
      description: line.description,
      count: existing.count + line.quantity,
      revenue: existing.revenue + line.quantity * line.unit_price,
    });
  }
  return Array.from(totals.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

// The item that moved the most units, counting a movement in either direction.
export function busiestItemId(
  movements: { inventory_item_id: string | null; change_qty: number }[],
): string | null {
  const moved = new Map<string, number>();
  for (const movement of movements) {
    if (!movement.inventory_item_id) continue;
    const previous = moved.get(movement.inventory_item_id) ?? 0;
    moved.set(movement.inventory_item_id, previous + Math.abs(movement.change_qty));
  }
  return Array.from(moved.entries()).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;
}
