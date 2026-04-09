import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./app/lib/auth";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("admin-token")?.value;
  const isAuthenticated = token && verifyToken(token);

  if (pathname === "/godmode" && isAuthenticated) {
    return NextResponse.redirect(new URL("/godmode/dashboard", request.url));
  }

  if (pathname.startsWith("/godmode") && pathname !== "/godmode") {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/godmode", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/godmode/:path*", "/godmode"],
};
