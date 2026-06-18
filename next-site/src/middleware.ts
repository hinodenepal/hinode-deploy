import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "./lib/auth";
import { defaultLocale, isValidLocale } from "@/lib/i18n";

const PUBLIC_PATHS = ["/tours", "/blog", "/about", "/inquiry", "/contact", "/destinations", "/testimonials"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Redirect /[locale]/hin-admin to /hin-admin
  if (pathname.match(/^\/[a-z]{2}\/hin-admin/)) {
    return NextResponse.redirect(new URL(pathname.replace(/^\/[a-z]{2}/, ""), req.url));
  }

  // 1. Secure Admin Frontend Pages
  if (pathname.startsWith("/hin-admin")) {
    const isLoginPage = pathname === "/hin-admin/login";
    const cookie = req.cookies.get("ADMIN_SESSION");
    const session = await verifySession(cookie?.value || null);

    if (!session && !isLoginPage) {
      return NextResponse.redirect(new URL("/hin-admin/login", req.url));
    }

    if (session && isLoginPage) {
      return NextResponse.redirect(new URL("/hin-admin", req.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/") && !pathname.startsWith("/api/hin-admin/login")) {
    const isProtectedMethod = ["POST", "PUT", "DELETE", "PATCH"].includes(req.method);
    
    // Public POST endpoints
    const isPublicPost = req.method === "POST" && (pathname === "/api/inquiries" || pathname === "/api/messages");
    
    // Protected GET endpoints (only admin should read these)
    const isProtectedGet = req.method === "GET" && (pathname === "/api/inquiries" || pathname === "/api/messages");

    if ((isProtectedMethod && !isPublicPost) || isProtectedGet) {
      const cookie = req.cookies.get("ADMIN_SESSION");
      const session = await verifySession(cookie?.value || null);

      if (!session) {
        return new NextResponse(
          JSON.stringify({ success: false, error: "Authentication required" }),
          { status: 401, headers: { "Content-Type": "application/json" } }
        );
      }
    }
  }

  // Skip other API routes, _next internals, static files
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/_vercel") ||
    pathname.includes(".") // static files (favicon, etc.)
  ) {
    return NextResponse.next();
  }

  // 3. i18n Localization Redirection
  // If the path starts with /en, we pass it through. Next.js handles it via [lang].
  if (pathname.startsWith('/en')) {
    return NextResponse.next();
  }

  // If the user visits /ja/something, redirect them to /something
  if (pathname.startsWith('/ja')) {
    const newPath = pathname.replace(/^\/ja/, '') || '/';
    return NextResponse.redirect(new URL(newPath, req.url));
  }

  // For everything else (the "root"), rewrite it to /ja/... so the [lang] folder matches it
  return NextResponse.rewrite(new URL(`/ja${pathname}`, req.url));

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|hinode-logo.svg|.*\\.(?:svg|png|jpg|jpeg|gif|webp)).*)",
  ],
};
