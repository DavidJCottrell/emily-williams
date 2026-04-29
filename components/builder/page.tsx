import { Builder } from "@/components/builder/Builder";

/**
 * Visual builder for project case study pages.
 *
 * Access control lives in `middleware.ts`:
 *   - If BUILDER_PASSWORD is unset in production, this route 404s.
 *   - Otherwise unauthenticated requests are redirected to /builder/login.
 *   - In development with no password set, the route is open.
 */
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Project Builder — Emily Williams",
  robots: { index: false, follow: false },
};

export default function BuilderPage() {
  return <Builder />;
}
