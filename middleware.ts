// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get("token")?.value;

//   if (request.nextUrl.pathname.startsWith("/admin")) {
//     if (!token) {
//       return NextResponse.redirect(new URL("/login", request.url));
//     }

//     // Optional: if you use JWT with "role"
//     try {
//       const payload = JSON.parse(atob(token.split(".")[1]));
//       if (payload.role !== "admin") {
//         return NextResponse.redirect(new URL("/dashboard", request.url));
//       }
//     } catch {
//       return NextResponse.redirect(new URL("/login", request.url));
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/admin/:path*"],
// };
