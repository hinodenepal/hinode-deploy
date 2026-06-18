import { NextRequest, NextResponse } from "next/server";
import { signSession, setSessionCookie } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import { Admin } from "@/lib/models/Admin";
import bcrypt from "bcryptjs";

// In-memory store for rate limiting (resets on server restart)
// For production, use Redis or a DB-backed store
const failedAttempts = new Map<string, { count: number; lockedUntil: number }>();

const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

function getClientIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const now = Date.now();

  // Check rate limiting
  const record = failedAttempts.get(ip);
  if (record && record.lockedUntil > now) {
    const minutesLeft = Math.ceil((record.lockedUntil - now) / 60000);
    return NextResponse.json(
      { success: false, error: `Too many failed attempts. Please try again in ${minutesLeft} minute(s).` },
      { status: 429 }
    );
  }

  try {
    await connectDB();
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ success: false, error: "Username and password required." }, { status: 400 });
    }

    // Auto-setup first admin if collection is empty
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const defaultUsername = process.env.ADMIN_USERNAME;
      const defaultPassword = process.env.ADMIN_PASSWORD;

      if (defaultUsername && defaultPassword) {
        const hashedPassword = await bcrypt.hash(defaultPassword, 12);
        await Admin.create({ username: defaultUsername, passwordHash: hashedPassword });
        console.log("Initial admin user created from environment variables.");
      }
    }

    const admin = await Admin.findOne({ username });

    // Always run bcrypt compare to prevent timing attacks (even if user not found)
    const dummyHash = "$2b$12$invalidhashfortimingprotectiononly00000000000000000000000";
    const passwordToCompare = admin ? admin.passwordHash : dummyHash;
    const isMatch = admin ? await bcrypt.compare(password, passwordToCompare) : false;

    if (!admin || !isMatch) {
      // Record failed attempt
      const attempts = failedAttempts.get(ip) ?? { count: 0, lockedUntil: 0 };
      attempts.count += 1;
      if (attempts.count >= MAX_ATTEMPTS) {
        attempts.lockedUntil = now + LOCKOUT_DURATION_MS;
        console.warn(`Admin login: IP ${ip} locked out after ${MAX_ATTEMPTS} failed attempts.`);
      }
      failedAttempts.set(ip, attempts);

      // Deliberate delay to slow down brute-force
      await new Promise((r) => setTimeout(r, 1000));

      return NextResponse.json({ success: false, error: "Invalid username or password." }, { status: 401 });
    }

    // Successful login — clear failed attempts
    failedAttempts.delete(ip);

    const token = await signSession("admin");
    const response = NextResponse.json({ success: true, message: "Logged in successfully." });
    setSessionCookie(response, token);
    return response;
  } catch (error: any) {
    console.error("Admin login error:", error);
    return NextResponse.json({ success: false, error: "An internal server error occurred." }, { status: 500 });
  }
}
