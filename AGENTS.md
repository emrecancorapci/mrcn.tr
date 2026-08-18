# AGENTS.md

Guidance for AI agents (and humans) working on this repository.

## What this is

Personal portfolio website of Emre Can Çorapçı, deployed at https://mrcn.tr.
Static site: **Astro 7** (static output) + **Tailwind CSS v4** (CSS-first config) + **React 19**
(server-rendered only — no `client:` directives anywhere) + Zod-validated content collections.

## Commands

```bash
pnpm dev        # dev server
pnpm build      # production build to dist/
pnpm preview    # preview built site
pnpm check      # astro check (TypeScript diagnostics, incl. .astro frontmatter)
pnpm lint       # biome check (ts/tsx/md/json/css in src/)
pnpm format     # prettier (.astro files) + biome format (everything else in scope)
```

There is no test framework; `pnpm build && pnpm check` is the verification layer.
Run both before committing.

Requires Node >= 24 and pnpm >= 11.

## Tooling layout

- **Biome** (`biome.json`) — linter + formatter for `src/**/*.{ts,tsx,md,json,css}`.
- **Prettier** (`.prettierrc.ts`) — formatter for `.astro` files only (via `prettier-plugin-astro`
  and `prettier-plugin-tailwindcss` for class sorting in templates).
- Do not reintroduce ESLint; it was removed as redundant with Biome.
- Commits follow Conventional Commits (`feat:`, `fix:`, `chore:`, `perf:`, `refactor:`, `docs:`),
  lowercase, imperative. Every logical change gets its own commit.

## Routing & pages

File-based routing under `src/pages/`. Files/dirs prefixed with `_` are excluded from routing
(this is how `_components/` directories next to pages stay unrouted).

| Route | File | Notes |
|---|---|---|
| `/` | `pages/index.astro` | Composes `home/_components/*` (hero, about-me, featured experiences/projects) |
| `/projects` | `pages/projects/index.astro` | Groups by project type, ordered by `order` in `types.json` |
| `/projects/[id]` | `pages/projects/[id].astro` | Static from `project` collection; `id` = slug of the md filename |
| `/experiences` | `pages/experiences/index.astro` | Sorted ascending by `priority` (1 first) |
| `/skills` | `pages/skills/index.astro` | Grouped by category; items sorted by proficiency desc |
| `/404` | `pages/404.astro` | The "msitakes" typo is intentional — do not fix |
| `/robots.txt` | `pages/robots.txt.ts` | The only robots source; `public/robots.txt` was removed because public files silently override generated endpoints |
| sitemap | `@astrojs/sitemap` | Emits `/sitemap-index.xml` |

## Layouts

- `layouts/base.astro` — HTML shell: meta (incl. OG/Twitter/canonical), favicon, `Font`,
  PostHog (prod only), pre-paint theme script (dark by default, `localStorage.theme` or
  `prefers-color-scheme`).
- `layouts/layout.astro` — page chrome: `Header` + main + `Footer`. `full` prop widens the main column.
- `layouts/left-column-layout.astro` — two-column layout with named slots (`title`, `description`),
  used by /projects, /experiences, /skills.

## Content collections (`src/content.config.ts`)

Four collections, all Zod-validated in `src/schemas/`:

- `project` — glob `src/data/projects/*.md`. Frontmatter: `featured?`, `projectType` (reference),
  `status` (enum), `year?`, `version?`, `mainTags`, `links?`, `blocks?` (discriminated union:
  `tags` / `plain` / `records` / `list`, each with optional `onTop`).
- `projectType` — file `src/data/projects/types.json` (keys are the ids referenced by
  `projectType`; each has `title` + `order`).
- `experiences` — glob `src/data/experiences/*.md`. `priority` sorts ascending; `featured`
  marks entries shown on the home page.
- `skills` — file `src/data/skills.json`. `proficiency` is a 1–5 int (`Familiar`…`Expert`).

### Content conventions

- The home page "featured" sections are **derived from collections** (`featured: true`,
  sorted). Do not hardcode content there.
- `file()` loader ids come from **object keys**, not from an `id` field inside the JSON.
- For markdown collections, the entry `id` is a github-slug of the filename — dots are
  stripped, so `mrcn.tr.md` → `/projects/mrcntr`.
- Experience anchors use `companyAnchor()` from `src/lib/content.ts` (Turkish lowercase);
  keep the home page cards and `/experiences` cards using that helper so links stay in sync.

## Shared helpers

- `src/lib/utils.ts` — `cn()` (clsx + tailwind-merge), the shadcn convention.
- `src/lib/content.ts` — `companyAnchor()`, `PROJECT_STATUS_LABELS`, `getProjectTypesMap()`,
  `projectTypeTitle()`.

## Styling

- Tailwind v4, CSS-first: all design tokens live in `src/styles/global.css` (`:root` light
  palette, `.dark` overrides, `@theme inline` mappings). There is no `tailwind.config.*`.
- Theme is class-based (`<html class="dark">`), toggled by the script in `base.astro` +
  `components/ui/theme-toggle.astro`. Both palettes are maintained.
- shadcn-style tokens (zinc + green `--primary`); `shadcn/tailwind.css` import provides
  custom variants used by the footer separator.
- Prose customizations are CSS component classes in `global.css`:
  `.prose-project` (single project summary) and `.prose-experience` (experience cards).
  Reuse them instead of long `prose-*` utility chains.
- Repeated long class strings should be extracted to a const in frontmatter (see
  `about-me-images.astro` `frameClass`).

## Components

- `components/ui/button.tsx` — shadcn-style CVA button over Base UI. **Zero client-side JS
  ships**: React is never hydrated. To make a link look like a button, use
  `buttonVariants({...})` on an `<a>` — never wrap a `<Button>` inside an `<a>` (invalid
  nesting) and never use `onclick` on a `<div>`; use the stretched-link pattern
  (`after:absolute after:inset-0`) for clickable cards (see `project-card.astro`).
- `components/ui/theme-toggle.astro` — the only component with a `<script>`.
- `components/post-hog.astro` — analytics, rendered only in production. Key/host come from
  `PUBLIC_POSTHOG_KEY` / `PUBLIC_POSTHOG_HOST` (see `.env.example`); write-keys are public
  by design.

## Images

- All raster images live in `src/images/` and are rendered via `astro:assets` `<Picture>`
  (sharp). Use `formats={["webp", "jpeg"]}` for photos; PNG fallback only for images with
  transparency.
- Keep sources reasonably sized (~1600px wide max for photos) — huge sources slow every build.
- `public/` holds only `favicon.svg` and `og-image.png`.

## i18n

`astro.config.mjs` declares `locales: ["tr", "en"]`, but the site is single-locale English.
The config is groundwork for future localized routes; content/UI is not translated.

## Known quirks

- The `404.astro` "msitakes" misspelling is a joke — intentional.
- Shiki code blocks use `everforest-dark` and stay dark in both themes (intentional).
- `me-with-bg.png` illustration was made by the owner's sister (credited in the about section).

## Improvement backlog (not yet implemented)

- **Port `button.tsx` to an Astro component** and drop the React toolchain
  (`react`, `react-dom`, `@base-ui/react`, `@astrojs/react`, `@types/react*`): no component is
  ever hydrated, so React exists only to statically render buttons. Keep the CVA variants
  (`class-variance-authority` is framework-agnostic); move `buttonVariants` usages to
  `class={buttonVariants(...)}` on elements in `.astro` files.
- **Consent-gate or lazy-init PostHog** (first-interaction/`requestIdleCallback`); disable
  `autocapture` if unused — GDPR posture for an EU-facing site.
- **Add CI** (GitHub Actions): `pnpm build && pnpm check && pnpm lint` on push. No `.github/` exists yet.
- **Skills ordering**: category order relies on JSON key order; consider an explicit `order`
  field per category (like `types.json`) for consistency.
- `graduation-project.md` is categorized `freelance` — decide whether a dedicated type fits better.
