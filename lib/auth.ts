/**
 * Auth configuration for /builder.
 *
 *   - If BUILDER_PASSWORD is set, the builder is accessible to anyone
 *     who logs in with that password.
 *   - If BUILDER_PASSWORD is unset AND NODE_ENV is "development", the
 *     builder is open with no auth (local dev convenience).
 *   - Otherwise, the builder is fully locked (login form rejects
 *     everything because there's no password to match).
 *
 * This file is safe to import from middleware (Edge runtime) and
 * server route handlers — it doesn't touch any Node-only APIs.
 */

export const AUTH_COOKIE = "builder_auth";
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export function getConfiguredPassword(): string | undefined {
  return process.env.BUILDER_PASSWORD;
}

/**
 * Whether the builder is enabled in this environment at all. When it's
 * not enabled, builder routes 404.
 */
export function isBuilderEnabled(): boolean {
  return Boolean(getConfiguredPassword()) || process.env.NODE_ENV === "development";
}

/**
 * Whether a request carrying the given cookie value is authenticated.
 * In dev with no password set, this is always true.
 */
export function isAuthorised(cookieValue: string | undefined): boolean {
  const expected = getConfiguredPassword();
  if (!expected) {
    // Dev convenience: no password set → no gate. (In production,
    // isBuilderEnabled returns false in this case so we never get here.)
    return process.env.NODE_ENV === "development";
  }
  return cookieValue === expected;
}
