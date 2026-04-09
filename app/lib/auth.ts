import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@talora.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin";

export interface AuthPayload {
  email: string;
  exp: number;
}

export async function verifyPassword(
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword);
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export function verifyCredentials(email: string, password: string): boolean {
  // For simple auth, we just check against env variables
  // In production, you'd hash the password in .env.local
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}

export function createToken(email: string): string {
  return jwt.sign({ email }, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): AuthPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthPayload;
    return decoded;
  } catch {
    return null;
  }
}

export async function setAuthCookie(email: string): Promise<void> {
  const token = createToken(email);
  const cookieStore = await cookies();

  cookieStore.set("admin-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

export async function clearAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("admin-token");
}

export async function getAuthUser(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin-token")?.value;

  if (!token) return null;

  const decoded = verifyToken(token);
  return decoded ? decoded.email : null;
}

export async function requireAuth(): Promise<string> {
  const user = await getAuthUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
}
