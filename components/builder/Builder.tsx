"use client";

import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { ProjectDetail } from "@/components/ProjectDetail";
import {
  Project,
  ProjectBlock,
  ProjectCategory,
  ProjectMetric,
  TwoColumnChild,
  projects as seedProjects,
} from "@/data/projects";

import "./builder.css";

const STORAGE_KEY = "emilyw.builder.v1";

/* ===========================================================
   Empty / starter values
   =========================================================== */

function emptyProject(): Project {
  return {
    slug: "",
    title: "",
    category: "brand",
    client: "",
    year: String(new Date().getFullYear()),
    role: "",
    summary: "",
    intro: "",
    body: [],
    scope: [],
    blocks: [],
  };
}

function newBlock(type: ProjectBlock["type"]): ProjectBlock {
  switch (type) {
    case "richText":
      return { type, content: "" };
    case "heading":
      return { type, text: "", level: "h3" };
    case "quote":
      return { type, text: "", attribution: "" };
    case "image":
      return { type, src: "", alt: "", caption: "" };
    case "gallery":
      return { type, images: [{ src: "", alt: "", caption: "" }] };
    case "twoColumn":
      return {
        type,
        left: { type: "richText", content: "" },
        right: { type: "image", src: "", alt: "", caption: "" },
      };
    case "section":
      return { type, label: "Challenge", title: "", body: "" };
  }
}

const BLOCK_TYPES: { value: ProjectBlock["type"]; label: string }[] = [
  { value: "richText", label: "Rich text" },
  { value: "heading", label: "Heading" },
  { value: "quote", label: "Pull quote" },
  { value: "image", label: "Image" },
  { value: "gallery", label: "Gallery" },
  { value: "twoColumn", label: "Two column" },
  { value: "section", label: "Labelled section" },
];

/* ===========================================================
   Builder root
   =========================================================== */

export function Builder() {
  const [project, setProject] = useState<Project>(() => emptyProject());
  const [hydrated, setHydrated] = useState(false);
  const [exportMode, setExportMode] = useState<"ts" | "json">("ts");
  const [exportOpen, setExportOpen] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");

  // Hydrate from localStorage once on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") {
          setProject({ ...emptyProject(), ...parsed });
        }
      }
    } catch {
      /* ignore corrupt drafts */
    }
    setHydrated(true);
  }, []);

  // Persist on every change (after hydration)
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(project));
    } catch {
      /* quota / private mode — silently ignore */
    }
  }, [project, hydrated]);

  /* ----- field updates ----- */

  const update = useCallback(<K extends keyof Project>(key: K, value: Project[K]) => {
    setProject((p) => ({ ...p, [key]: value }));
  }, []);

  const loadFromSeed = useCallback((slug: string) => {
    if (slug === "__new__") {
      setProject(emptyProject());
      return;
    }
    const found = seedProjects.find((p) => p.slug === slug);
    if (!found) return;
    // If the seed has body but no blocks, seed blocks from body so the
    // user can start editing visually right away.
    const blocks: ProjectBlock[] =
      found.blocks && found.blocks.length > 0
        ? found.blocks
        : found.body.map((para) => ({
            type: "richText" as const,
            content: para,
          }));
    setProject({ ...found, blocks });
  }, []);

  const reset = useCallback(() => {
    if (
      window.confirm(
        "Reset the builder? Your current draft will be cleared from local storage.",
      )
    ) {
      setProject(emptyProject());
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
    }
  }, []);

  /* ----- export ----- */

  const exportText = useMemo(() => {
    const sanitized = stripEmpty(project);
    if (exportMode === "json") {
      return JSON.stringify(sanitized, null, 2);
    }
    return toTypescript(sanitized);
  }, [project, exportMode]);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(exportText);
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 1400);
    } catch {
      /* clipboard blocked */
    }
  }, [exportText]);

  /* ----- preview project (always supplies non-throwing defaults) ----- */

  const previewProject: Project = useMemo(
    () => ({
      ...project,
      slug: project.slug || "preview",
      title: project.title || "Untitled project",
      client: project.client || "Client",
      year: project.year || "—",
      role: project.role || "Role",
      summary: project.summary || "",
      intro: project.intro || "Intro / lede goes here.",
      // ProjectDetail falls back to body when blocks is empty;
      // give it a tiny placeholder paragraph in that case so the
      // body column is never visually empty in the preview.
      body:
        project.body && project.body.length > 0
          ? project.body
          : ["Add blocks on the left to fill out the body of this project page."],
    }),
    [project],
  );

  return (
    <div className="builder">
      <BuilderTopBar
        currentSlug={project.slug}
        onLoad={loadFromSeed}
        onReset={reset}
        onToggleExport={() => setExportOpen((v) => !v)}
        exportOpen={exportOpen}
      />

      {exportOpen && (
        <ExportPanel
          mode={exportMode}
          onModeChange={setExportMode}
          text={exportText}
          onCopy={copy}
          copyState={copyState}
          onClose={() => setExportOpen(false)}
        />
      )}

      <div className="builder__split">
        <aside className="builder__editor">
          <EditorForm project={project} update={update} setProject={setProject} />
        </aside>

        <main className="builder__preview" aria-label="Live preview">
          <div className="builder__preview-frame">
            <ProjectDetail project={previewProject} isPreview />
          </div>
        </main>
      </div>
    </div>
  );
}

/* ===========================================================
   Top bar
   =========================================================== */

function BuilderTopBar({
  currentSlug,
  onLoad,
  onReset,
  onToggleExport,
  exportOpen,
}: {
  currentSlug: string;
  onLoad: (slug: string) => void;
  onReset: () => void;
  onToggleExport: () => void;
  exportOpen: boolean;
}) {
  return (
    <header className="builder__bar">
      <div className="builder__bar-left">
        <span className="builder__brand">
          Project Builder <span className="builder__brand-dim">/ dev only</span>
        </span>
      </div>

      <div className="builder__bar-right">
        <label className="builder__select">
          <span>Load</span>
          <select
            value={currentSlug && seedProjects.some((p) => p.slug === currentSlug) ? currentSlug : ""}
            onChange={(e) => onLoad(e.target.value)}
          >
            <option value="">— pick a project —</option>
            <option value="__new__">+ New blank project</option>
            <optgroup label="Existing projects">
              {seedProjects.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.title}
                </option>
              ))}
            </optgroup>
          </select>
        </label>

        <button type="button" className="builder__btn" onClick={onReset}>
          Reset
        </button>

        <button
          type="button"
          className="builder__btn builder__btn--primary"
          onClick={onToggleExport}
          aria-expanded={exportOpen}
        >
          {exportOpen ? "Close export" : "Export"}
        </button>
      </div>
    </header>
  );
}

/* ===========================================================
   Export panel
   =========================================================== */

function ExportPanel({
  mode,
  onModeChange,
  text,
  onCopy,
  copyState,
  onClose,
}: {
  mode: "ts" | "json";
  onModeChange: (m: "ts" | "json") => void;
  text: string;
  onCopy: () => void;
  copyState: "idle" | "copied";
  onClose: () => void;
}) {
  return (
    <div className="builder__export">
      <div className="builder__export-head">
        <div className="builder__seg">
          <button
            type="button"
            className={mode === "ts" ? "is-on" : ""}
            onClick={() => onModeChange("ts")}
          >
            TypeScript
          </button>
          <button
            type="button"
            className={mode === "json" ? "is-on" : ""}
            onClick={() => onModeChange("json")}
          >
            JSON
          </button>
        </div>
        <div className="builder__export-actions">
          <button type="button" className="builder__btn" onClick={onCopy}>
            {copyState === "copied" ? "Copied ✓" : "Copy"}
          </button>
          <button type="button" className="builder__btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
      <p className="builder__export-help">
        Paste this into <code>data/projects.ts</code> as an entry in the{" "}
        <code>projects</code> array (replacing any existing entry with the same{" "}
        <code>slug</code>).
      </p>
      <textarea
        readOnly
        value={text}
        spellCheck={false}
        className="builder__export-text"
      />
    </div>
  );
}

/* ===========================================================
   Editor form
   =========================================================== */

function EditorForm({
  project,
  update,
  setProject,
}: {
  project: Project;
  update: <K extends keyof Project>(key: K, value: Project[K]) => void;
  setProject: React.Dispatch<React.SetStateAction<Project>>;
}) {
  return (
    <div className="ed">
      <Group title="Details">
        <Field label="Slug" hint="URL segment, e.g. brand-refresh">
          <input
            type="text"
            value={project.slug}
            onChange={(e) => update("slug", slugify(e.target.value))}
            placeholder="my-project"
          />
        </Field>
        <Field label="Title">
          <input
            type="text"
            value={project.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="Project title"
          />
        </Field>
        <div className="ed__row">
          <Field label="Category">
            <select
              value={project.category}
              onChange={(e) =>
                update("category", e.target.value as ProjectCategory)
              }
            >
              <option value="brand">Brand</option>
              <option value="marketing">Marketing</option>
              <option value="culture">Culture</option>
            </select>
          </Field>
          <Field label="Year">
            <input
              type="text"
              value={project.year}
              onChange={(e) => update("year", e.target.value)}
              placeholder="2025"
            />
          </Field>
        </div>
        <Field label="Client">
          <input
            type="text"
            value={project.client}
            onChange={(e) => update("client", e.target.value)}
            placeholder="Client name"
          />
        </Field>
        <Field label="Role">
          <input
            type="text"
            value={project.role}
            onChange={(e) => update("role", e.target.value)}
            placeholder="Brand strategy, copywriting, design"
          />
        </Field>
        <Field
          label="Hero image"
          hint="Absolute URL or /assets/... path"
        >
          <input
            type="text"
            value={project.image ?? ""}
            onChange={(e) => update("image", e.target.value || undefined)}
            placeholder="/assets/cover.jpg"
          />
        </Field>
        <Field
          label="External link"
          hint="Optional — shown in the sidebar as 'View live'"
        >
          <input
            type="text"
            value={project.href ?? ""}
            onChange={(e) => update("href", e.target.value || undefined)}
            placeholder="https://…"
          />
        </Field>
      </Group>

      <Group title="Intro">
        <Field label="Tile summary" hint="Shown beneath the homepage tile title">
          <textarea
            rows={3}
            value={project.summary}
            onChange={(e) => update("summary", e.target.value)}
          />
        </Field>
        <Field label="Lede / intro" hint="Opens the detail page">
          <textarea
            rows={4}
            value={project.intro}
            onChange={(e) => update("intro", e.target.value)}
          />
        </Field>
      </Group>

      <Group title="Sidebar">
        <Field label="Scope of work" hint="One bullet per line">
          <textarea
            rows={4}
            value={project.scope.join("\n")}
            onChange={(e) =>
              update(
                "scope",
                e.target.value
                  .split("\n")
                  .map((l) => l.trimStart())
                  .filter((l, i, arr) => l.length > 0 || i === arr.length - 1),
              )
            }
            placeholder={"Positioning, values, and messaging\nVisual identity refresh\n…"}
          />
        </Field>
      </Group>

      <Group title="Metrics" subtitle="Optional pull-out figures shown above the body">
        <MetricsEditor
          metrics={project.metrics ?? []}
          onChange={(metrics) =>
            update("metrics", metrics.length > 0 ? metrics : undefined)
          }
        />
      </Group>

      <Group title="Body blocks" subtitle="The visually-authored body of the page">
        <BlocksEditor
          blocks={project.blocks ?? []}
          onChange={(blocks) =>
            setProject((p) => ({ ...p, blocks }))
          }
        />
      </Group>

      <Group title="Outcome" subtitle="Italicised pull-out at the end of the body">
        <Field label="Outcome statement">
          <textarea
            rows={3}
            value={project.outcome ?? ""}
            onChange={(e) =>
              update("outcome", e.target.value || undefined)
            }
          />
        </Field>
      </Group>

      <Group title="Gallery" subtitle="Full-width images at the bottom of the page">
        <GalleryEditor
          images={project.gallery ?? []}
          onChange={(gallery) =>
            update("gallery", gallery.length > 0 ? gallery : undefined)
          }
        />
      </Group>
    </div>
  );
}

/* ===========================================================
   Form primitives
   =========================================================== */

function Group({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="ed__group">
      <header className="ed__group-head">
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </header>
      <div className="ed__group-body">{children}</div>
    </section>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="ed__field">
      <span className="ed__field-label">{label}</span>
      {children}
      {hint && <span className="ed__field-hint">{hint}</span>}
    </label>
  );
}

/* ===========================================================
   Metrics editor
   =========================================================== */

function MetricsEditor({
  metrics,
  onChange,
}: {
  metrics: ProjectMetric[];
  onChange: (m: ProjectMetric[]) => void;
}) {
  const updateAt = (i: number, patch: Partial<ProjectMetric>) =>
    onChange(metrics.map((m, idx) => (idx === i ? { ...m, ...patch } : m)));
  const remove = (i: number) =>
    onChange(metrics.filter((_, idx) => idx !== i));
  const add = () => onChange([...metrics, { value: "", label: "" }]);

  return (
    <div className="ed__list">
      {metrics.map((m, i) => (
        <div className="ed__list-row" key={i}>
          <input
            type="text"
            value={m.value}
            onChange={(e) => updateAt(i, { value: e.target.value })}
            placeholder="+49%"
            className="ed__list-row-narrow"
          />
          <input
            type="text"
            value={m.label}
            onChange={(e) => updateAt(i, { label: e.target.value })}
            placeholder="Follower growth"
          />
          <button
            type="button"
            className="ed__icon-btn"
            onClick={() => remove(i)}
            aria-label="Remove metric"
            title="Remove"
          >
            ✕
          </button>
        </div>
      ))}
      <button type="button" className="ed__add" onClick={add}>
        + Add metric
      </button>
    </div>
  );
}

/* ===========================================================
   Gallery editor
   =========================================================== */

function GalleryEditor({
  images,
  onChange,
}: {
  images: string[];
  onChange: (g: string[]) => void;
}) {
  const updateAt = (i: number, value: string) =>
    onChange(images.map((src, idx) => (idx === i ? value : src)));
  const remove = (i: number) =>
    onChange(images.filter((_, idx) => idx !== i));
  const add = () => onChange([...images, ""]);

  return (
    <div className="ed__list">
      {images.map((src, i) => (
        <div className="ed__list-row" key={i}>
          <input
            type="text"
            value={src}
            onChange={(e) => updateAt(i, e.target.value)}
            placeholder="/assets/image.jpg"
          />
          <button
            type="button"
            className="ed__icon-btn"
            onClick={() => remove(i)}
            aria-label="Remove image"
            title="Remove"
          >
            ✕
          </button>
        </div>
      ))}
      <button type="button" className="ed__add" onClick={add}>
        + Add image
      </button>
    </div>
  );
}

/* ===========================================================
   Blocks editor
   =========================================================== */

function BlocksEditor({
  blocks,
  onChange,
}: {
  blocks: ProjectBlock[];
  onChange: (b: ProjectBlock[]) => void;
}) {
  const [adderType, setAdderType] = useState<ProjectBlock["type"]>("richText");

  const add = () => onChange([...blocks, newBlock(adderType)]);

  const updateAt = (i: number, next: ProjectBlock) =>
    onChange(blocks.map((b, idx) => (idx === i ? next : b)));

  const remove = (i: number) =>
    onChange(blocks.filter((_, idx) => idx !== i));

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= blocks.length) return;
    const next = [...blocks];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  return (
    <div className="blocks">
      {blocks.length === 0 && (
        <p className="blocks__empty">
          No blocks yet. Add one below to start building the body of this page.
        </p>
      )}

      {blocks.map((block, i) => (
        <BlockEditor
          key={i}
          block={block}
          onChange={(next) => updateAt(i, next)}
          onRemove={() => remove(i)}
          onMoveUp={i > 0 ? () => move(i, -1) : undefined}
          onMoveDown={i < blocks.length - 1 ? () => move(i, 1) : undefined}
        />
      ))}

      <div className="blocks__adder">
        <select
          value={adderType}
          onChange={(e) =>
            setAdderType(e.target.value as ProjectBlock["type"])
          }
        >
          {BLOCK_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
        <button type="button" className="ed__add" onClick={add}>
          + Add block
        </button>
      </div>
    </div>
  );
}

function BlockEditor({
  block,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
}: {
  block: ProjectBlock;
  onChange: (b: ProjectBlock) => void;
  onRemove: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}) {
  const label = BLOCK_TYPES.find((t) => t.value === block.type)?.label ?? block.type;
  return (
    <div className="block-card">
      <header className="block-card__head">
        <span className="block-card__type">{label}</span>
        <div className="block-card__controls">
          <button
            type="button"
            className="ed__icon-btn"
            onClick={onMoveUp}
            disabled={!onMoveUp}
            aria-label="Move up"
            title="Move up"
          >
            ↑
          </button>
          <button
            type="button"
            className="ed__icon-btn"
            onClick={onMoveDown}
            disabled={!onMoveDown}
            aria-label="Move down"
            title="Move down"
          >
            ↓
          </button>
          <button
            type="button"
            className="ed__icon-btn"
            onClick={onRemove}
            aria-label="Delete block"
            title="Delete"
          >
            ✕
          </button>
        </div>
      </header>
      <div className="block-card__body">
        <BlockFields block={block} onChange={onChange} />
      </div>
    </div>
  );
}

/* Per-type field editors */

function BlockFields({
  block,
  onChange,
}: {
  block: ProjectBlock;
  onChange: (b: ProjectBlock) => void;
}) {
  switch (block.type) {
    case "richText":
      return (
        <Field
          label="Content"
          hint="Double-newline separates paragraphs"
        >
          <textarea
            rows={6}
            value={block.content}
            onChange={(e) =>
              onChange({ ...block, content: e.target.value })
            }
          />
        </Field>
      );

    case "heading":
      return (
        <>
          <Field label="Text">
            <input
              type="text"
              value={block.text}
              onChange={(e) => onChange({ ...block, text: e.target.value })}
            />
          </Field>
          <Field label="Level">
            <select
              value={block.level ?? "h3"}
              onChange={(e) =>
                onChange({
                  ...block,
                  level: e.target.value as "h2" | "h3",
                })
              }
            >
              <option value="h3">Small (h3)</option>
              <option value="h2">Large (h2)</option>
            </select>
          </Field>
        </>
      );

    case "quote":
      return (
        <>
          <Field label="Quote">
            <textarea
              rows={3}
              value={block.text}
              onChange={(e) => onChange({ ...block, text: e.target.value })}
            />
          </Field>
          <Field label="Attribution" hint="Optional">
            <input
              type="text"
              value={block.attribution ?? ""}
              onChange={(e) =>
                onChange({
                  ...block,
                  attribution: e.target.value || undefined,
                })
              }
            />
          </Field>
        </>
      );

    case "image":
      return (
        <>
          <Field label="Image src">
            <input
              type="text"
              value={block.src}
              onChange={(e) => onChange({ ...block, src: e.target.value })}
              placeholder="/assets/image.jpg"
            />
          </Field>
          <Field label="Alt text">
            <input
              type="text"
              value={block.alt ?? ""}
              onChange={(e) =>
                onChange({ ...block, alt: e.target.value || undefined })
              }
            />
          </Field>
          <Field label="Caption" hint="Optional">
            <input
              type="text"
              value={block.caption ?? ""}
              onChange={(e) =>
                onChange({
                  ...block,
                  caption: e.target.value || undefined,
                })
              }
            />
          </Field>
        </>
      );

    case "gallery":
      return (
        <GalleryBlockEditor
          images={block.images}
          onChange={(images) => onChange({ ...block, images })}
        />
      );

    case "twoColumn":
      return (
        <div className="ed__twocol">
          <div className="ed__twocol-side">
            <h4 className="ed__sub">Left</h4>
            <TwoColumnSideEditor
              child={block.left}
              onChange={(left) => onChange({ ...block, left })}
            />
          </div>
          <div className="ed__twocol-side">
            <h4 className="ed__sub">Right</h4>
            <TwoColumnSideEditor
              child={block.right}
              onChange={(right) => onChange({ ...block, right })}
            />
          </div>
        </div>
      );

    case "section":
      return (
        <>
          <div className="ed__row">
            <Field label="Eyebrow label" hint="e.g. Challenge">
              <input
                type="text"
                value={block.label ?? ""}
                onChange={(e) =>
                  onChange({
                    ...block,
                    label: e.target.value || undefined,
                  })
                }
              />
            </Field>
            <Field label="Title" hint="Optional">
              <input
                type="text"
                value={block.title ?? ""}
                onChange={(e) =>
                  onChange({
                    ...block,
                    title: e.target.value || undefined,
                  })
                }
              />
            </Field>
          </div>
          <Field label="Body">
            <textarea
              rows={5}
              value={block.body}
              onChange={(e) => onChange({ ...block, body: e.target.value })}
            />
          </Field>
        </>
      );
  }
}

function GalleryBlockEditor({
  images,
  onChange,
}: {
  images: { src: string; alt?: string; caption?: string }[];
  onChange: (
    images: { src: string; alt?: string; caption?: string }[],
  ) => void;
}) {
  const updateAt = (
    i: number,
    patch: Partial<{ src: string; alt?: string; caption?: string }>,
  ) =>
    onChange(
      images.map((img, idx) => (idx === i ? { ...img, ...patch } : img)),
    );
  const remove = (i: number) =>
    onChange(images.filter((_, idx) => idx !== i));
  const add = () => onChange([...images, { src: "", alt: "", caption: "" }]);

  return (
    <div className="ed__list">
      {images.map((img, i) => (
        <div className="ed__nested" key={i}>
          <div className="ed__nested-head">
            <span>Image {i + 1}</span>
            <button
              type="button"
              className="ed__icon-btn"
              onClick={() => remove(i)}
              aria-label="Remove image"
            >
              ✕
            </button>
          </div>
          <Field label="Src">
            <input
              type="text"
              value={img.src}
              onChange={(e) => updateAt(i, { src: e.target.value })}
              placeholder="/assets/image.jpg"
            />
          </Field>
          <Field label="Alt">
            <input
              type="text"
              value={img.alt ?? ""}
              onChange={(e) =>
                updateAt(i, { alt: e.target.value || undefined })
              }
            />
          </Field>
          <Field label="Caption">
            <input
              type="text"
              value={img.caption ?? ""}
              onChange={(e) =>
                updateAt(i, { caption: e.target.value || undefined })
              }
            />
          </Field>
        </div>
      ))}
      <button type="button" className="ed__add" onClick={add}>
        + Add image
      </button>
    </div>
  );
}

function TwoColumnSideEditor({
  child,
  onChange,
}: {
  child: TwoColumnChild;
  onChange: (c: TwoColumnChild) => void;
}) {
  const onTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const next = e.target.value as TwoColumnChild["type"];
    if (next === child.type) return;
    if (next === "richText") onChange({ type: "richText", content: "" });
    else onChange({ type: "image", src: "", alt: "", caption: "" });
  };

  return (
    <>
      <Field label="Type">
        <select value={child.type} onChange={onTypeChange}>
          <option value="richText">Rich text</option>
          <option value="image">Image</option>
        </select>
      </Field>
      {child.type === "richText" ? (
        <Field label="Content" hint="Double-newline separates paragraphs">
          <textarea
            rows={4}
            value={child.content}
            onChange={(e) =>
              onChange({ type: "richText", content: e.target.value })
            }
          />
        </Field>
      ) : (
        <>
          <Field label="Src">
            <input
              type="text"
              value={child.src}
              onChange={(e) =>
                onChange({ ...child, src: e.target.value })
              }
              placeholder="/assets/image.jpg"
            />
          </Field>
          <Field label="Alt">
            <input
              type="text"
              value={child.alt ?? ""}
              onChange={(e) =>
                onChange({
                  ...child,
                  alt: e.target.value || undefined,
                })
              }
            />
          </Field>
          <Field label="Caption">
            <input
              type="text"
              value={child.caption ?? ""}
              onChange={(e) =>
                onChange({
                  ...child,
                  caption: e.target.value || undefined,
                })
              }
            />
          </Field>
        </>
      )}
    </>
  );
}

/* ===========================================================
   Helpers
   =========================================================== */

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9-\s]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Drop empty strings, empty arrays, and undefined fields for a cleaner export. */
function stripEmpty(p: Project): Project {
  const out: Project = { ...p };

  // Empty body when blocks are present — body is the legacy fallback.
  if (out.blocks && out.blocks.length > 0) {
    out.body = [];
  }

  // Remove undefined-y optionals
  if (!out.image) delete out.image;
  if (!out.href) delete out.href;
  if (!out.outcome) delete out.outcome;
  if (!out.gallery || out.gallery.length === 0) delete out.gallery;
  if (!out.metrics || out.metrics.length === 0) delete out.metrics;
  if (!out.blocks || out.blocks.length === 0) delete out.blocks;

  return out;
}

/**
 * Render a Project as a TS object literal. Uses JSON.stringify for the
 * heavy lifting then unquotes object keys so the result reads as TS.
 */
function toTypescript(p: Project): string {
  const json = JSON.stringify(p, null, 2);
  // Unquote object keys that are valid identifiers (good-enough for our shape).
  const unquoted = json.replace(/"([A-Za-z_][A-Za-z0-9_]*)":/g, "$1:");
  return unquoted;
}
