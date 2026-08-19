import { NextResponse, type NextRequest } from "next/server";
import {
  ACCESS_COOKIE_MAX_AGE,
  ACCESS_COOKIE_NAME,
  ACCESS_TOKEN_PARAM,
  gateOpensWithoutToken,
  isPublicPath,
  secretsMatch,
} from "@/lib/access";

// The app has no login of its own — the shop asked for a till with nothing to
// type — so this is what keeps the shop's takings off the open internet. Open
// the site once per device with ?k=<token> and the cookie carries it from then
// on. Without SITE_ACCESS_TOKEN set the gate stays open, which is what local
// development and the E2E defaults rely on — but a production build with the
// variable missing (a Preview deployment, a dropped env var) would otherwise
// serve the whole shop to anyone who found the URL, so there it fails closed.
export function proxy(request: NextRequest) {
  if (isPublicPath(request.nextUrl.pathname)) return NextResponse.next();

  const token = process.env.SITE_ACCESS_TOKEN;
  if (!token) {
    return gateOpensWithoutToken(process.env.NODE_ENV)
      ? NextResponse.next()
      : new NextResponse("Not found", { status: 404 });
  }

  const cookie = request.cookies.get(ACCESS_COOKIE_NAME)?.value;
  if (cookie && secretsMatch(cookie, token)) return NextResponse.next();

  const provided = request.nextUrl.searchParams.get(ACCESS_TOKEN_PARAM);
  if (provided && secretsMatch(provided, token)) {
    // Drop the token from the address bar so it does not end up in a
    // screenshot, a shared link, or the browser history of a borrowed phone.
    const clean = new URL(request.nextUrl);
    clean.searchParams.delete(ACCESS_TOKEN_PARAM);
    const response = NextResponse.redirect(clean);
    response.cookies.set(ACCESS_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: ACCESS_COOKIE_MAX_AGE,
    });
    return response;
  }

  // 404 rather than 401: a wrong guess should not confirm that anything is here.
  return new NextResponse("Not found", { status: 404 });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
