import { cookies } from "next/headers";
import {
  decodeSession,
  SESSION_COOKIE_NAME,
  sessionCookie,
  type Session,
} from "./session-token";

const COOKIE_NAME = SESSION_COOKIE_NAME;

export type { Session };

export async function createSession(session: Session) {
  const cookieStore = await cookies();
  const cookie = sessionCookie(session);
  cookieStore.set(cookie.name, cookie.value, cookie.options);
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
