import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get("user")?.value;

  if (!cookie) {
    // 🚫 No cookie? Block access to protected routes
    if (
      request.nextUrl.pathname.startsWith("/admin") ||
      request.nextUrl.pathname.startsWith("/dashboard")
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  try {
    const user = JSON.parse(decodeURIComponent(cookie));

    // 🔒 If not admin, block access to /admin
    if (
      request.nextUrl.pathname.startsWith("/admin") &&
      user.role !== "admin"
    ) {
      return NextResponse.redirect(new URL("/404", request.url));
    }
  } catch (err) {
    // Malformed cookie? Redirect to login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"], // 🛡️ Protect these routes
};
