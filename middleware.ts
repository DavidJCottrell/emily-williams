import { NextRequest, NextResponse } from "next/server";

import {
  AUTH_COOKIE,
  isAuthorised,
  isBuilderEnabled,
} from "@/lib/auth";

/**
 * Auth middleware for the builder.
 *
 * Routes covered:
 *   /builder/*          — UI pages
 *   /api/projects/*     — read/write blob
 *   /api/builder/*      — login / logout
 *
 * The login pages and login API route are exempt from auth (otherwise
 * you couldn't log in), but they still respect the kill-switch — if
 * the builder isn't enabled, they 404 too.
 */
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Kill switch: builder fully disabled → rewrite to /404 so even the
  // login form is invisible.
  if (!isBuilderEnabled()) {
    return new NextResponse(null, { status: 404 });
  }

  // Login routes don't require auth — they're how you get auth.
  const isLoginRoute =
    path === "/builder/login" || path === "/api/builder/login";
  if (isLoginRoute) return NextResponse.next();

  // Logout doesn't require an auth check — we're just clearing the cookie.
  if (path === "/api/builder/logout") return NextResponse.next();

  const cookie = request.cookies.get(AUTH_COOKIE)?.value;
  if (isAuthorised(cookie)) return NextResponse.next();

  // API → 401 JSON. Pages → redirect to login.
  if (path.startsWith("/api/")) {
    return NextResponse.json({ error: "unauthorised" }, { status: 401 });
  }

  const url = request.nextUrl.clone();
  url.pathname = "/builder/login";
  url.search = `?next=${encodeURIComponent(path + request.nextUrl.search)}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/builder/:path*", "/api/projects/:path*", "/api/builder/:path*"],
};
