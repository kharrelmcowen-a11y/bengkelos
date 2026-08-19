import { cookies } from "next/headers";
import {
  decodeSession,
  encodeSession,
  SESSION_MAX_AGE_SECONDS,
  type Session,
} from "./session-token";

const COOKIE_NAME = "bengkelos_session";

export type { Session };

export async function createSession(session: Session) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, encodeSession(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return decodeSession(token);
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
