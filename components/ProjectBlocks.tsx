import type { ProjectBlock, TwoColumnChild } from "@/data/projects";

/**
 * Renders an array of content blocks. Designed to live INSIDE the
 * existing `.project__copy` column so it inherits the typography
 * and spacing of the project detail page.
 */
export function ProjectBlocks({ blocks }: { blocks: ProjectBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => (
        <BlockRenderer key={i} block={block} />
      ))}
    </>
  );
}

function BlockRenderer({ block }: { block: ProjectBlock }) {
  switch (block.type) {
    case "richText":
      return <RichText content={block.content} />;
    case "heading":
      return <Heading text={block.text} level={block.level ?? "h3"} />;
    case "quote":
      return <Quote text={block.text} attribution={block.attribution} />;
    case "image":
      return (
        <Image
          src={block.src}
          alt={block.alt}
          caption={block.caption}
        />
      );
    case "gallery":
      return <Gallery images={block.images} />;
    case "twoColumn":
      return <TwoColumn left={block.left} right={block.right} />;
    case "section":
      return (
        <Section
          label={block.label}
          title={block.title}
          body={block.body}
        />
      );
    default:
      return null;
  }
}

/* -----------------------------------------------------------
   Individual blocks
   ----------------------------------------------------------- */

function paragraphs(content: string) {
  return content
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function RichText({ content }: { content: string }) {
  return (
    <div className="block block--richtext">
      {paragraphs(content).map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}

function Heading({ text, level }: { text: string; level: "h2" | "h3" }) {
  const Tag = level;
  return <Tag className={`block block--heading block--heading-${level}`}>{text}</Tag>;
}

function Quote({
  text,
  attribution,
}: {
  text: string;
  attribution?: string;
}) {
  return (
    <figure className="block block--quote">
      <blockquote>
        <p>{text}</p>
      </blockquote>
      {attribution && <figcaption>— {attribution}</figcaption>}
    </figure>
  );
}

function Image({
  src,
  alt,
  caption,
}: {
  src: string;
  alt?: string;
  caption?: string;
}) {
  return (
    <figure className="block block--image">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt ?? ""} loading="lazy" />
      ) : (
        <div className="block__placeholder" aria-hidden="true">
          <span>Image</span>
        </div>
      )}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

function Gallery({
  images,
}: {
  images: { src: string; alt?: string; caption?: string }[];
}) {
  if (!images.length) return null;
  return (
    <div className="block block--gallery">
      {images.map((img, i) => (
        <figure key={i}>
          {img.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={img.src} alt={img.alt ?? ""} loading="lazy" />
          ) : (
            <div className="block__placeholder" aria-hidden="true">
              <span>Image</span>
            </div>
          )}
          {img.caption && <figcaption>{img.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
}

function TwoColumn({
  left,
  right,
}: {
  left: TwoColumnChild;
  right: TwoColumnChild;
}) {
  return (
    <div className="block block--twocol">
      <TwoColumnSide child={left} />
      <TwoColumnSide child={right} />
    </div>
  );
}

function TwoColumnSide({ child }: { child: TwoColumnChild }) {
  if (child.type === "richText") {
    return (
      <div className="block__twocol-side">
        {paragraphs(child.content).map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    );
  }
  return (
    <figure className="block__twocol-side">
      {child.src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={child.src} alt={child.alt ?? ""} loading="lazy" />
      ) : (
        <div className="block__placeholder" aria-hidden="true">
          <span>Image</span>
        </div>
      )}
      {child.caption && <figcaption>{child.caption}</figcaption>}
    </figure>
  );
}

function Section({
  label,
  title,
  body,
}: {
  label?: string;
  title?: string;
  body: string;
}) {
  return (
    <div className="block block--section">
      {label && <span className="block__section-label">{label}</span>}
      {title && <h3 className="block__section-title">{title}</h3>}
      {paragraphs(body).map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}
