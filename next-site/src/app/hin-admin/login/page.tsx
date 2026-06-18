"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please enter the administrator username and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/hin-admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.success) {
        router.push("/hin-admin");
        router.refresh();
      } else {
        setError(data.error || "Incorrect administrator password.");
      }
    } catch (err) {
      setError("A connection error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col justify-between py-12 px-6 lg:px-8">
      {/* Header Info */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2 group mb-4">
          <img 
            src="/hinode-logo.svg" 
            alt="Hinode Logo" 
            className="w-6 h-6 text-[#8B2C24]" 
          />
          <span className="text-sm tracking-[0.3em] uppercase text-[#2C2C2C] font-semibold">
            HINODE NEPAL
          </span>
        </Link>
      </div>

      {/* Main card */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-8 shadow-xl shadow-black/5 border border-[#E8E5DF] rounded-sm">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-light tracking-widest text-[#2C2C2C] mb-2">
              ADMINISTRATOR LOGIN
            </h2>
            <p className="text-[#5A5A5A] text-xs uppercase tracking-widest font-light">
              Enter credentials to access the CMS portal
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs rounded-sm font-light">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label 
                htmlFor="username" 
                className="block text-xs uppercase tracking-widest text-[#5A5A5A] font-medium mb-2"
              >
                Username
              </label>
              <div className="relative mb-6">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="block w-full px-4 py-3 border border-[#D1CCC5] rounded-sm bg-transparent placeholder-[#A39E99] focus:outline-none focus:border-[#8B2C24] transition-colors text-sm text-[#2C2C2C]"
                />
              </div>

              <label 
                htmlFor="password" 
                className="block text-xs uppercase tracking-widest text-[#5A5A5A] font-medium mb-2"
              >
                Password Key
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-[#A39E99]" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="block w-full pl-10 pr-4 py-3 border border-[#D1CCC5] rounded-sm bg-transparent placeholder-[#A39E99] focus:outline-none focus:border-[#8B2C24] transition-colors text-sm text-[#2C2C2C]"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 bg-[#8B2C24] text-white text-xs tracking-widest uppercase rounded-sm hover:bg-[#A03830] transition-colors disabled:opacity-50 font-medium"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer info */}
      <div className="text-center text-xs text-[#A39E99] tracking-wider uppercase font-light">
        © {new Date().getFullYear()} Hinode Nepal. Secure Environment.
      </div>
    </div>
  );
}
