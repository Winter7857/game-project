import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "./utils/loginUser";

// export function middleware(request: NextRequest) {
//   const cookie = request.cookies.get("user")?.value;
//   if (!cookie) {
//     // 🚫 No cookie? Block access to protected routes
//     if (
//       request.nextUrl.pathname.startsWith("/admin") ||
//       request.nextUrl.pathname.startsWith("/dashboard"),
//       request.nextUrl.pathname.startsWith("/games/new")
//     ) {
//       return NextResponse.redirect(new URL("/login", request.url));
//     }
//     return NextResponse.next();
//   }

  // try {
  //   const user = JSON.parse(decodeURIComponent(cookie));

  //   // 🔒 If not admin, block access to /admin
  //   if (
  //     request.nextUrl.pathname.startsWith("/admin") &&
  //     user.role !== "admin"
  //   ) {
  //     return NextResponse.redirect(new URL("/404", request.url));
  //   }
  // } catch (err) {
  //   // Malformed cookie? Redirect to login
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

//   return NextResponse.next();
// }

// middleware.ts (or wherever your config lives)

export async function middleware(request: NextRequest) {
  console.log("Middleware invoked")
  const res = await updateSession(request)
  console.log("Middleware res: ", res)
  if (res)
      return res
  else
      return NextResponse.redirect(new URL("/login", request.url))


  // === Short coing style
  // return (await updateSession(request)) || NextResponse.redirect(new URL("/blog/login", request.url));
}
export const config = {
  matcher: [
    '/admin/:path*',
    '/dashboard/:path*',
    '/game/:path*'
              // ← protect the “create game” page
  ],
};

