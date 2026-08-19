import { createHmac, timingSafeEqual } from "node:crypto";

export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 12; // 12h shift-length session

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
    const { exp: _exp, ...session } = parsed;
    return session;
  } catch {
    return null;
  }
}
