import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import {
  AUTH_COOKIE,
  COOKIE_MAX_AGE,
  getConfiguredPassword,
} from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/builder/login
 * Body: { password: string }
 *
 * Sets an HTTPOnly cookie containing the configured password if it
 * matches. The middleware checks this cookie on every protected route.
 */
export async function POST(request: Request) {
  const expected = getConfiguredPassword();
  if (!expected) {
    // No password configured — login impossible (in dev, the middleware
    // skips auth entirely so we shouldn't end up here).
    return NextResponse.json(
      { error: "BUILDER_PASSWORD is not configured on the server" },
      { status: 500 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const supplied = (body as { password?: unknown })?.password;
  if (typeof supplied !== "string" || supplied.length === 0) {
    return NextResponse.json(
      { error: "password required" },
      { status: 400 },
    );
  }

  // Constant-time-ish comparison. Lengths differ → false.
  if (supplied.length !== expected.length) {
    return NextResponse.json({ error: "wrong password" }, { status: 401 });
  }
  let mismatch = 0;
  for (let i = 0; i < supplied.length; i++) {
    mismatch |= supplied.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  if (mismatch !== 0) {
    return NextResponse.json({ error: "wrong password" }, { status: 401 });
  }

  const jar = await cookies();
  jar.set(AUTH_COOKIE, expected, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });

  return NextResponse.json({ ok: true });
}
