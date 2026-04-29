import "server-only";

import { head, put, get, BlobNotFoundError } from "@vercel/blob";

import type { Project } from "@/data/projects";

const BLOB_PATH = "projects.json";

/**
 * Read the projects array from the blob store.
 * Returns null if the blob doesn't exist yet (first run).
 *
 * Uses the SDK's get() rather than fetching the public URL because
 * the store is configured with private access — its URLs aren't
 * publicly fetchable. get() streams the content via the
 * BLOB_READ_WRITE_TOKEN and is always fresh (no edge caching).
 */
export async function readProjectsBlob(): Promise<Project[] | null> {
  try {
    // head() throws BlobNotFoundError if the blob doesn't exist yet
    await head(BLOB_PATH);
  } catch (err) {
    if (err instanceof BlobNotFoundError) return null;
    console.error("[blob] head failed:", err);
    return null;
  }

  try {
    const result = await get(BLOB_PATH, { access: "private" });
    if (!result || !result.stream) return null;

    const text = await new Response(result.stream).text();
    const data = JSON.parse(text);
    return Array.isArray(data) ? data : null;
  } catch (err) {
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
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}