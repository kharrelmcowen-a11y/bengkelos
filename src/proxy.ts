import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE_NAME } from "@/lib/session-token";

/**
 * Sends a visitor with no session to the PIN screen.
 *
 * This is a redirect, not the security boundary. It only asks whether a cookie
 * is present — never whether it is valid, and never what role it carries. Every
 * page still calls getSession() and every action still runs through
 * authActionClient or ownerActionClient; those verify the signature and are
 * what actually keep the shop's books private. Middleware-only auth has been
 * bypassable in Next before, so nothing here is trusted to stand alone.
 *
 * What it buys: the four "new" form pages are client components and cannot call
 * getSession() themselves, and a page added later is covered before anyone
 * remembers to guard it.
 *
 * It replaces the ?k=<token> gate, which existed only because the till had no
 * login of its own. With a PIN back in front of the app that reason is gone,
 * and the token was locking the partner shop out of its own till.
 */
function isPublicPath(pathname: string): boolean {
  return (
    pathname === "/login" ||
    // Carries its own bearer secret and arrives with no cookies.
    pathname.startsWith("/api/cron/") ||
    pathname.startsWith("/_next/") ||
    pathname === "/favicon.ico"
  );
}

export function proxy(request: NextRequest) {
  if (isPublicPath(request.nextUrl.pathname)) return NextResponse.next();
  if (request.cookies.has(SESSION_COOKIE_NAME)) return NextResponse.next();

  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
