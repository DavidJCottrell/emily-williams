# Emily Williams — Portfolio

Next.js 15 (App Router) + React 19 + TypeScript. Single-page portfolio with editorial work list, cursor-following image preview, and scroll-triggered reveals.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Project structure

```
app/
  layout.tsx        # Root layout, fonts, metadata
  page.tsx          # Composes all sections
  globals.css       # All styling — design tokens, components, animations
components/
  Nav.tsx           # Fixed top nav (mix-blend-mode: difference)
  Hero.tsx          # Marquee name, intro, scroll cue
  About.tsx
  Work.tsx          # Client — editorial list + cursor preview
  Services.tsx
  Contact.tsx       # Client — magnetic CTA effect
  Footer.tsx
  Reveal.tsx        # Client — IntersectionObserver wrapper
data/
  projects.ts       # Edit case studies here
```

## What to edit

Most copy is hard-coded in components for clarity. Quick reference:

| What           | Where                                 |
| -------------- | ------------------------------------- |
| Projects       | `data/projects.ts`                    |
| Bio            | `components/About.tsx`                |
| Services       | `components/Services.tsx`             |
| Hero intro     | `components/Hero.tsx`                 |
| Email / social | `components/Contact.tsx`              |
| Site metadata  | `app/layout.tsx`                      |
| Design tokens  | `app/globals.css` (`:root` variables) |

## Replacing project images

Right now images come from Unsplash for placeholder purposes. To use real images:

1. Drop them in `public/work/`
2. In `data/projects.ts`, change `image: "https://images.unsplash.com/..."` to `image: "/work/your-image.jpg"`
3. (Optional) Migrate the `<img>` tags in `components/Work.tsx` to `next/image` for automatic optimization. You'll need to remove the Unsplash entry from `next.config.ts` once you stop using it.

## Design tokens

Edit `:root` in `app/globals.css` to change the palette:

```css
--bg: #F1ECE2;        /* warm cream background */
--ink: #16140F;       /* primary text */
--ink-soft: #6B6457;  /* muted text */
--rule: #C9C0AE;      /* hairlines */
--accent: #B85C38;    /* terracotta accent */
```

## Fonts

Loaded from Google Fonts via `<link>` in `app/layout.tsx` to preserve the variable axes (`opsz`, `SOFT`) used by the marquee. If you prefer self-hosted, switch to `next/font/google` — note the `SOFT` variation will fall back gracefully.

## Deploy

Easiest path is Vercel:

```bash
npx vercel
```

Or push to GitHub and import the repo at [vercel.com/new](https://vercel.com/new). Build command: `next build`.

## Notes

- The site respects `prefers-reduced-motion` — animations are suppressed for users who request it
- Cursor preview and magnetic CTA only run on fine pointers (desktop), so mobile gets a clean fallback
- All sections are server components except `Work`, `Contact`, and `Reveal` — keeps the JS bundle minimal
