import Link from "next/link";

import { ProjectBlocks } from "./ProjectBlocks";
import { Reveal } from "./Reveal";
import { categoryMeta, type Project } from "@/data/projects";

type ProjectDetailProps = {
  project: Project;
  /** Previous project in the same category (omit when not applicable, e.g. in the builder preview). */
  prev?: Project;
  /** Next project in the same category. */
  next?: Project;
  /** When true, suppresses the back link + prev/next navigation (used by the builder preview). */
  isPreview?: boolean;
};

export function ProjectDetail({
  project,
  prev,
  next,
  isPreview = false,
}: ProjectDetailProps) {
  const meta = categoryMeta[project.category];

  // Three placeholder slots if no gallery is provided yet
  const galleryItems =
    project.gallery && project.gallery.length > 0
      ? project.gallery.map((src) => ({ src, kind: "image" as const }))
      : [
          { src: undefined, kind: "placeholder" as const },
          { src: undefined, kind: "placeholder" as const },
          { src: undefined, kind: "placeholder" as const },
        ];

  const useBlocks = project.blocks && project.blocks.length > 0;

  return (
    <article className="project">
      <div className="shell">
        {!isPreview && (
          <Link href="/#work" className="project__back">
            <span aria-hidden="true">←</span> All work
          </Link>
        )}

        <Reveal className="project__head">
          <div className="project__meta">
            <span>{meta.label}</span>
            <span aria-hidden="true" className="project__meta-sep">
              ·
            </span>
            <span>{project.client}</span>
            <span aria-hidden="true" className="project__meta-sep">
              ·
            </span>
            <span>{project.year}</span>
          </div>

          <h1 className="project__title">{project.title}</h1>

          <p className="project__lede">{project.intro}</p>
        </Reveal>

        {project.metrics && project.metrics.length > 0 && (
          <Reveal stagger className="project__metrics">
            {project.metrics.map((m) => (
              <div key={m.label} className="metric">
                <span className="metric__value">{m.value}</span>
                <span className="metric__label">{m.label}</span>
              </div>
            ))}
          </Reveal>
        )}

        <div className="project__body">
          <Reveal className="project__copy">
            {useBlocks ? (
              <ProjectBlocks blocks={project.blocks!} />
            ) : (
              project.body.map((para, i) => <p key={i}>{para}</p>)
            )}

            {project.outcome && (
              <div className="project__outcome">
                <span className="project__outcome-label">Outcome</span>
                <p>{project.outcome}</p>
              </div>
            )}
          </Reveal>

          <Reveal className="project__sidebar">
            <div className="project__sidebar-block">
              <span className="project__sidebar-label">Role</span>
              <p>{project.role}</p>
            </div>

            <div className="project__sidebar-block">
              <span className="project__sidebar-label">Scope of work</span>
              <ul>
                {project.scope.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>

            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="project__sidebar-link"
              >
                View live <span aria-hidden="true">→</span>
              </a>
            )}
          </Reveal>
        </div>

        <Reveal stagger className="project__gallery">
          {galleryItems.map((item, i) =>
            item.kind === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={item.src}
                alt={`${project.title} — image ${i + 1}`}
                loading="lazy"
                className="project__gallery-img"
              />
            ) : (
              <div
                key={i}
                className="project__gallery-placeholder"
                aria-hidden="true"
              >
                <span>Image / video placeholder</span>
              </div>
            ),
          )}
        </Reveal>

        {!isPreview && (
          <Reveal className="project__nav">
            {prev ? (
              <Link
                href={`/work/${prev.slug}`}
                className="project__nav-link project__nav-link--prev"
              >
                <span className="project__nav-dir">
                  <span aria-hidden="true">←</span> Previous
                </span>
                <span className="project__nav-title">{prev.title}</span>
              </Link>
            ) : (
              <span aria-hidden="true" />
            )}
            {next ? (
              <Link
                href={`/work/${next.slug}`}
                className="project__nav-link project__nav-link--next"
              >
                <span className="project__nav-dir">
                  Next <span aria-hidden="true">→</span>
                </span>
                <span className="project__nav-title">{next.title}</span>
              </Link>
            ) : (
              <span aria-hidden="true" />
            )}
          </Reveal>
        )}
      </div>
    </article>
  );
}
