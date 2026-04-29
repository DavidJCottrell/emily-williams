import { notFound } from "next/navigation";

import { Builder } from "@/components/builder/Builder";

/**
 * Visual builder for project case study pages.
 *
 * Available only when:
 *   - NODE_ENV === "development", or
 *   - NEXT_PUBLIC_ENABLE_BUILDER === "true"
 *
 * In a normal production build the route 404s, so the builder
 * is removed without any code changes.
 */
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Project Builder — Emily Williams",
  robots: { index: false, follow: false },
};

export default function BuilderPage() {
  const enabled =
    process.env.NODE_ENV === "development" ||
    process.env.NEXT_PUBLIC_ENABLE_BUILDER === "true";

  if (!enabled) notFound();

  return <Builder />;
}
