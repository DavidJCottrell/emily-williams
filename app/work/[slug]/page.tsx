import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ProjectDetail } from "@/components/ProjectDetail";
import { projects as seedProjects } from "@/data/projects";
import {
  getAllProjects,
  getProjectBySlug,
} from "@/lib/projects-server";

type RouteParams = { slug: string };

/**
 * generateStaticParams runs at build time. Read from blob if it exists,
 * otherwise fall back to the static seed. Slugs added at runtime via the
 * builder are still routable thanks to the default `dynamicParams: true`
 * — they'll just be rendered on demand until the next deploy.
 */
export async function generateStaticParams(): Promise<RouteParams[]> {
  try {
    const all = await getAllProjects();
    return all.map((p) => ({ slug: p.slug }));
  } catch {
    return seedProjects.map((p) => ({ slug: p.slug }));
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Work — Emily Williams" };

  return {
    title: `${project.title} — Emily Williams`,
    description: project.summary,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const all = await getAllProjects();
  const project = all.find((p) => p.slug === slug);
  if (!project) notFound();

  // Prev / next within the same category
  const sameCategory = all.filter((p) => p.category === project.category);
  const indexInCat = sameCategory.findIndex((p) => p.slug === project.slug);
  const prev = indexInCat > 0 ? sameCategory[indexInCat - 1] : undefined;
  const next =
    indexInCat < sameCategory.length - 1
      ? sameCategory[indexInCat + 1]
      : undefined;

  return (
    <>
      <Nav />
      <ProjectDetail project={project} prev={prev} next={next} />
      <Footer />
    </>
  );
}
