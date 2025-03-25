import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const PROTECTED_ROUTES = ["/logout", "/onboarding", "/api", "/discovery"];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const sessionCookie = getSessionCookie(request, { cookieName: "session_token", cookiePrefix: "zora" });

  if (!sessionCookie && PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  if (sessionCookie && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/discovey", request.url));
  }

  return NextResponse.next();
}

export const config = { matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"] };
