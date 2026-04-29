import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ProjectDetail } from "@/components/ProjectDetail";
import { getProjectBySlug, projects } from "@/data/projects";

type RouteParams = { slug: string };

export function generateStaticParams(): RouteParams[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
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
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  // Prev / next within the same category
  const sameCategory = projects.filter((p) => p.category === project.category);
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
