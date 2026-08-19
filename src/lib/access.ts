export const ACCESS_COOKIE_NAME = "bengkelos_access";
export const ACCESS_TOKEN_PARAM = "k";
// A year: the till and the owner's phone should each need the link once.
export const ACCESS_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/**
 * Constant-time comparison. Bailing out on the first wrong character leaks the
 * token one character at a time to anyone willing to time the responses.
 */
export function secretsMatch(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

/**
 * Paths the gate must not touch: the cron route carries its own bearer secret
 * and arrives without cookies, and blocking static assets would only break the
 * page for someone who is already through.
 */
export function isPublicPath(pathname: string): boolean {
  return (
    pathname.startsWith("/api/cron/") ||
    pathname.startsWith("/_next/") ||
    pathname === "/favicon.ico"
  );
}
