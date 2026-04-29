import "server-only";

import { cache } from "react";

import {
  type Project,
  type ProjectCategory,
  projects as seedProjects,
} from "@/data/projects";
import { readProjectsBlob } from "./blob-store";

/**
 * Source of truth at runtime:
 *   - If the projects.json blob exists, use it.
 *   - Otherwise fall back to the static seed in data/projects.ts.
 *
 * Wrapped in React `cache()` so multiple components in the same render
 * share a single fetch.
 */
export const getAllProjects = cache(async (): Promise<Project[]> => {
  const stored = await readProjectsBlob();
  return stored ?? seedProjects;
});

export async function getProjectBySlug(
  slug: string,
): Promise<Project | undefined> {
  const all = await getAllProjects();
  return all.find((p) => p.slug === slug);
}

export async function getProjectsByCategory(
  category: ProjectCategory,
): Promise<Project[]> {
  const all = await getAllProjects();
  return all.filter((p) => p.category === category);
}
