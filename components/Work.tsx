import Link from "next/link";
import {
  categoryMeta,
  categoryOrder,
  getProjectsByCategory,
  Project,
  ProjectCategory,
} from "@/data/projects";
import { Reveal } from "./Reveal";

export function Work() {
  return (
    <section className="section section--work" id="work">
      <div className="shell">
        {categoryOrder.map((category) => (
          <CategoryGroup key={category} category={category} />
        ))}
      </div>
    </section>
  );
}

function CategoryGroup({ category }: { category: ProjectCategory }) {
  const items = getProjectsByCategory(category);
  if (!items.length) return null;
  const meta = categoryMeta[category];

  return (
    <div className="work-group" id={`work-${category}`}>
      <Reveal className="work-group__head">
        <span className="work-group__label">{meta.label}</span>
        <p className="work-group__intro">{meta.intro}</p>
      </Reveal>

      <Reveal stagger className="work-group__grid">
        {items.map((project) => (
          <Tile key={project.slug} project={project} />
        ))}
      </Reveal>
    </div>
  );
}

function Tile({ project }: { project: Project }) {
  return (
    <Link href={`/work/${project.slug}`} className="tile">
      <div className="tile__media">
        {project.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="tile__img"
          />
        ) : (
          <div className="tile__placeholder" aria-hidden="true">
            <span>{project.client}</span>
          </div>
        )}
      </div>

      <div className="tile__body">
        <h3 className="tile__title">{project.title}</h3>
        <p className="tile__client">
          <span>{project.client}</span>
          <span className="tile__sep" aria-hidden="true">
            ·
          </span>
          <span>{project.year}</span>
        </p>
        <p className="tile__text">{project.summary}</p>
        <span className="tile__more">
          See more <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}
