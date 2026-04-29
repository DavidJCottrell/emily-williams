import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { readProjectsBlob, writeProjectsBlob } from "@/lib/blob-store";
import { type Project, projects as seedProjects } from "@/data/projects";

export const runtime = "nodejs"; // @vercel/blob requires Node runtime
export const dynamic = "force-dynamic";

/**
 * GET /api/projects
 * Returns the current projects array (blob, or static seed if no blob yet).
 */
export async function GET() {
  const stored = await readProjectsBlob();
  const projects = stored ?? seedProjects;
  return NextResponse.json(
    { projects, source: stored ? "blob" : "seed" },
    { headers: { "Cache-Control": "no-store" } },
  );
}

/**
 * POST /api/projects
 * Body: { projects: Project[] }
 *
 * Replaces the blob entirely with the supplied array, then revalidates
 * the homepage and the dynamic project route so the live site shows
 * the new content on next request.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "invalid json" },
      { status: 400 },
    );
  }

  const projects = (body as { projects?: unknown })?.projects;
  if (!Array.isArray(projects)) {
    return NextResponse.json(
      { error: "expected { projects: Project[] }" },
      { status: 400 },
    );
  }

  // Light validation — we don't want to write garbage into the blob.
  for (const p of projects as Project[]) {
    if (!p || typeof p !== "object") {
      return NextResponse.json(
        { error: "invalid project entry" },
        { status: 400 },
      );
    }
    if (typeof p.slug !== "string" || p.slug.length === 0) {
      return NextResponse.json(
        { error: "every project needs a non-empty slug" },
        { status: 400 },
      );
    }
  }

  try {
    await writeProjectsBlob(projects as Project[]);
  } catch (err) {
    console.error("[api/projects] write failed:", err);
    return NextResponse.json(
      { error: "blob write failed" },
      { status: 500 },
    );
  }

  // Invalidate cached pages. Pass `layout` for the homepage so its
  // child server components (Work) re-render too.
  revalidatePath("/", "layout");
  revalidatePath("/work/[slug]", "page");

  return NextResponse.json({ ok: true, count: projects.length });
}
