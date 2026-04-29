import "server-only";

import { head, put, BlobNotFoundError } from "@vercel/blob";

import type { Project } from "@/data/projects";

const BLOB_PATH = "projects.json";

/**
 * Read the projects array from the blob store.
 * Returns null if the blob doesn't exist yet (first run).
 *
 * Uses ETag-based cache busting: every read fetches the public URL with
 * `?v=<etag>` appended so we never get a stale cached copy after a write.
 */
export async function readProjectsBlob(): Promise<Project[] | null> {
  try {
    const meta = await head(BLOB_PATH);
    const url = `${meta.url}?v=${encodeURIComponent(meta.etag)}`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    const data = (await res.json()) as Project[];
    return Array.isArray(data) ? data : null;
  } catch (err) {
    if (err instanceof BlobNotFoundError) return null;
    // Surface unexpected errors so they show up in logs, but don't break
    // public pages — they fall back to the static seed.
    console.error("[blob] readProjectsBlob failed:", err);
    return null;
  }
}

/**
 * Write the projects array to the blob store, replacing the previous
 * value. Caller is responsible for revalidating any cached pages.
 */
export async function writeProjectsBlob(projects: Project[]): Promise<void> {
  await put(BLOB_PATH, JSON.stringify(projects, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    // Tell the CDN/browser not to cache aggressively. Vercel still has
    // a ~60s edge cache minimum on the public URL, but we cache-bust
    // on read with the ETag so this is mostly belt-and-braces.
    cacheControlMaxAge: 0,
  });
}
