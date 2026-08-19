import { createHmac, timingSafeEqual } from "node:crypto";

export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 12; // 12h shift-length session
export const SESSION_COOKIE_NAME = "bengkelos_session";

export type Session = {
  staffId: string;
  shopId: string;
  name: string;
  role: "owner" | "cashier" | "mechanic";
};

type SignedSession = Session & { exp: number };

function getSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET is not set");
  return secret;
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("hex");
}

export function encodeSession(session: Session, now = Date.now()): string {
  const signed: SignedSession = {
    ...session,
    exp: now + SESSION_MAX_AGE_SECONDS * 1000,
  };
  const payload = Buffer.from(JSON.stringify(signed)).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

// The cookie's own maxAge is a browser-side hint only — a copied token has to
// carry its own expiry, otherwise it stays valid forever once replayed.
export function decodeSession(token: string, now = Date.now()): Session | null {
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const expected = sign(payload);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as SignedSession;
    if (typeof parsed.exp !== "number" || parsed.exp <= now) return null;
    const { staffId, shopId, name, role } = parsed;
    return { staffId, shopId, name, role };
  } catch {
    return null;
  }
}

/**
 * The cookie a signed-in session is carried in. Returned as data rather than
 * set directly, because a route handler has to attach it to the response it
 * returns — a cookie written through next/headers is dropped when the handler
 * answers with a fresh NextResponse.
 */
export function sessionCookie(session: Session, now = Date.now()) {
  return {
    name: SESSION_COOKIE_NAME,
    value: encodeSession(session, now),
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      path: "/",
      maxAge: SESSION_MAX_AGE_SECONDS,
    },
  };
}
