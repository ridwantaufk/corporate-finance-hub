import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = [
  "/auth/login",
  "/oauth/callback",
  "/auth/register",
  "/dashboard/guest",
  "/clients",
];

const AUTH_FREE_PATHS = ["/auth/login", "/auth/register"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  const isPublicPath = PUBLIC_PATHS.some((path) => pathname.startsWith(path));

  if (token && AUTH_FREE_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|assets|public|static|images|robots.txt).*)",
  ],
};
