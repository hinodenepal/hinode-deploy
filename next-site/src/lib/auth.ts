import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "ADMIN_SESSION";
const SESSION_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 days

// Get admin password secret
const getSecret = () => {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET environment variable is not set. Please add it to your .env.local file.");
  }
  return secret;
};

// Helper to encode to Base64URL
function base64url(str: string): string {
  return btoa(unescape(encodeURIComponent(str)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

// Helper to decode from Base64URL
function debase64url(str: string): string {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  return decodeURIComponent(escape(atob(base64)));
}

// Generate HMAC-SHA256 using Web Crypto API
async function sign(data: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", cryptoKey, encoder.encode(data));
  const hashArray = Array.from(new Uint8Array(signature));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
}

// Verify HMAC-SHA256 signature
async function verify(data: string, signature: string, secret: string): Promise<boolean> {
  const expectedSignature = await sign(data, secret);
  return expectedSignature === signature;
}

export interface Session {
  user: string;
  expiresAt: number;
}

// Sign a session payload
export async function signSession(user: string = "admin"): Promise<string> {
  const expiresAt = Date.now() + SESSION_EXPIRY;
  const payload: Session = { user, expiresAt };
  const payloadStr = JSON.stringify(payload);
  const encodedPayload = base64url(payloadStr);
  const signature = await sign(encodedPayload, getSecret());
  return `${encodedPayload}.${signature}`;
}

// Verify and return session payload
export async function verifySession(token: string | null): Promise<Session | null> {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [encodedPayload, signature] = parts;
  const secret = getSecret();
  const isValid = await verify(encodedPayload, signature, secret);
  if (!isValid) return null;

  try {
    const payloadStr = debase64url(encodedPayload);
    const payload = JSON.parse(payloadStr) as Session;
    if (Date.now() > payload.expiresAt) {
      return null; // Expired
    }
    return payload;
  } catch {
    return null;
  }
}

// Get session from request cookies
export async function getSession(req: NextRequest): Promise<Session | null> {
  const cookie = req.cookies.get(COOKIE_NAME);
  if (!cookie) return null;
  return verifySession(cookie.value);
}

// Set session cookie on response
export function setSessionCookie(res: NextResponse, token: string) {
  res.cookies.set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_EXPIRY / 1000,
    path: "/",
  });
}

// Clear session cookie
export function clearSessionCookie(res: NextResponse) {
  res.cookies.set({
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
}
