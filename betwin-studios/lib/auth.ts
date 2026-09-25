import { cookies } from "next/headers";
import crypto from "node:crypto";

const COOKIE_NAME = "bet369_session";
const SECRET = process.env.AUTH_SECRET || "change-this-secret-in-production";

type Session = { userId: string; role: "USER" | "ADMIN"; exp: number };

function sign(payload: string) {
  return crypto.createHmac("sha256", SECRET).update(payload).digest("base64url");
}

function encode(session: Session) {
  const payload = Buffer.from(JSON.stringify(session)).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

function decode(value: string): Session | null {
  const [payload, signature] = value.split(".");
  if (!payload || !signature) return null; const expected=sign(payload); const a=Buffer.from(signature); const b=Buffer.from(expected); if (a.length!==b.length || !crypto.timingSafeEqual(a,b)) return null;
  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString()) as Session;
    if (!session.userId || !session.role || session.exp < Date.now()) return null;
    return session;
  } catch { return null; }
}

export async function setSession(session: Omit<Session, "exp"> & { exp?: number }) {
  const store = await cookies();
  store.set(COOKIE_NAME, encode({ ...session, exp: session.exp ?? Date.now() + 1000 * 60 * 60 * 24 * 7 }), {
    httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/",
  });
}

export async function clearSession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function getSession() {
  const store = await cookies();
  const value = store.get(COOKIE_NAME)?.value;
  return value ? decode(value) : null;
}

export async function requireSession(role?: "USER" | "ADMIN") {
  const session = await getSession();
  if (!session || (role && session.role !== role)) throw new Error("UNAUTHORIZED");
  return session;
}

export function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string) {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const candidate = crypto.scryptSync(password, salt, 64).toString("hex");
  return crypto.timingSafeEqual(Buffer.from(candidate, "hex"), Buffer.from(hash, "hex"));
}
