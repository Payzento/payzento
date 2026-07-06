import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("payzento_session")?.value;
  const { pathname } = request.nextUrl;

  const protectedRoutes = [
    "/dashboard",
    "/merchants-dashboard",
    "/new-transaction",
    "/review-funds",
    "/dispute-resolution"
  ];

  const isProtected = protectedRoutes.some(route => 
    pathname === route || pathname.startsWith(route + "/")
  );

  const isAuthRoute = pathname === "/sign-in" || pathname === "/getting-started";

  if (!session && isProtected) {
    const url = new URL("/sign-in", request.url);
    return NextResponse.redirect(url);
  }

  if (session && isAuthRoute) {
    const url = new URL("/dashboard", request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/merchants-dashboard/:path*",
    "/new-transaction/:path*",
    "/review-funds/:path*",
    "/dispute-resolution/:path*",
    "/sign-in",
    "/getting-started"
  ],
};
