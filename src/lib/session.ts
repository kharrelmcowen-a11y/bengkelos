import { cookies } from "next/headers";
import { decodeSession, SESSION_COOKIE_NAME, type Session } from "./session-token";

const COOKIE_NAME = SESSION_COOKIE_NAME;

export type { Session };

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return decodeSession(token);
}
