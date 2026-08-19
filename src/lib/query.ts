import { logDatabaseError } from "./logger";

export type QueryResult<T> = { data: T[] | null; error: { message: string } | null };

// A failed query used to fall through as an empty array, which reads on screen
// as a real zero. Log it instead so a broken query is visible.
export function rows<T>(result: QueryResult<T>, query: string, shopId: string): T[] {
  if (result.error) {
    logDatabaseError(query, new Error(result.error.message), { shopId });
    return [];
  }
  return result.data ?? [];
}
