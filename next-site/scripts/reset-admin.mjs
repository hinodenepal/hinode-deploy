/**
 * One-time admin reset script.
 * Run with: node scripts/reset-admin.mjs
 * Delete this file after running.
 */
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env.local manually
const envPath = resolve(__dirname, "../.env.local");
const envLines = readFileSync(envPath, "utf-8").split("\n");
const env = {};
for (const line of envLines) {
  const [key, ...rest] = line.split("=");
  if (key && rest.length) env[key.trim()] = rest.join("=").trim();
}

const MONGODB_URI = env.MONGODB_URI;
const ADMIN_USERNAME = env.ADMIN_USERNAME;
const ADMIN_PASSWORD = env.ADMIN_PASSWORD;

if (!MONGODB_URI || !ADMIN_USERNAME || !ADMIN_PASSWORD) {
  console.error("❌ Missing MONGODB_URI, ADMIN_USERNAME, or ADMIN_PASSWORD in .env.local");
  process.exit(1);
}

console.log(`🔧 Resetting admin: username="${ADMIN_USERNAME}"`);

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
}, { timestamps: true });

const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

await mongoose.connect(MONGODB_URI);
console.log("✅ Connected to MongoDB");

// Delete all existing admin records
const deleted = await Admin.deleteMany({});
console.log(`🗑️  Deleted ${deleted.deletedCount} existing admin record(s)`);

// Create fresh admin with new credentials
const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
await Admin.create({ username: ADMIN_USERNAME, passwordHash });
console.log(`✅ Admin account created: username="${ADMIN_USERNAME}"`);

await mongoose.disconnect();
console.log("✅ Done! You can now log in with the credentials in your .env.local");
console.log("🔑 Delete this script file after use: scripts/reset-admin.mjs");
