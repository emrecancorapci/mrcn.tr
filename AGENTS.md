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
| `/tr/*` | `pages/tr/**` | Turkish mirrors of every route above; thin wrappers over the shared `*-page.astro` / `project-page-body.astro` components |
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
  `projectType`; each has localized `title` + `order`).
- `experiences` — glob `src/data/experiences/*.md`. `priority` sorts ascending; `featured`
  marks entries shown on the home page.
- `skills` — file `src/data/skills.json` (array; each item needs a string `id` field for the
  `file()` loader). `proficiency` is a 1–5 int (`Familiar`…`Expert`).

### Content conventions

- The home page "featured" sections are **derived from collections** (`featured: true`,
  sorted). Do not hardcode content there.
- `file()` loader ids come from **object keys** for object-form JSON (`types.json`) and from
  the per-item **`id` field** for array-form JSON (`skills.json`).
- Markdown collections use a custom `generateId`: `name.md` → `name` (slug),
  `name.tr.md` → `name.tr`. Dots are stripped from slugs, so the EN file for this site is
  `mrcntr.md` → `/projects/mrcntr` (a `mrcn.tr.md` would collide with the `.tr` convention).
- Experience anchors use `companyAnchor()` from `src/lib/content.ts` (Turkish lowercase);
  keep the home page cards and `/experiences` cards using that helper so links stay in sync.

## Shared helpers

- `src/lib/utils.ts` — `cn()` (clsx + tailwind-merge), the shadcn convention.
- `src/lib/content.ts` — `companyAnchor()`, `getProjectTypesMap(locale)`, `projectTypeTitle()`.
- `src/lib/i18n-content.ts` — `entryLocale()`, `baseId()`, `forLocale()` (locale filtering /
  fallback for collection entries with `.tr` ids).

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
- `components/ui/theme-toggle.astro` and `components/ui/language-toggle.astro` — header
  controls; the theme toggle is the only component with a `<script>`. The language toggle is a
  plain link that swaps the `/tr` prefix (zero JS).
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

Two locales: **English (default, unprefixed)** and **Turkish (`/tr` prefix)**. Configured via
`i18n` in `astro.config.mjs` with `prefixDefaultLocale: false` and `fallback: { tr: "en" }` +
`fallbackType: "redirect"` — Astro auto-generates meta-refresh redirect stubs at `/tr/...` for
EN-only pages, and the sitemap emits hreflang alternates.

How it fits together:

- **UI strings** live in `src/i18n/ui/{en,tr}.ts` (flat key→string, TR typed as
  `Record<UIKeys, string>` so a missing key fails the build). Use
  `t(locale, key, params?)` from `src/i18n`; `{year}`-style placeholders are interpolated.
  `markedSegments()` splits `*emphasized*` markers for translated sentences with inline
  styling.
- **Locale in components**: components call `currentLocale(Astro.currentLocale)` themselves —
  no prop drilling. Internal links must go through `localePath(locale, path)`.
- **Localized content**: `name.md` (EN) + `name.tr.md` (TR) per collection entry (see
  `generateLocalizedId` in `content.config.ts`). Helpers in `src/lib/i18n-content.ts`:
  `entryLocale(id)`, `baseId(id)`, `forLocale(entries, locale)` (TR pages fall back to EN
  entries that have no translation). Slugs are shared across locales.
- **Localized JSON data**: `types.json` / `skills.json` titles use
  `localizedStringSchema` (`{ en, tr }`, both required) — a missing translation fails the
  build. Resolve with `localizedText(value, locale)` / `getProjectTypesMap(locale)`.
- **Routes**: each EN page body lives in a shared `*-page.astro` / `project-page-body.astro`
  component; `pages/tr/**` are thin wrappers. TR `/projects/[id]` builds paths only from `.tr`
  entries with `params.id = baseId(...)`.
- The **404 page is EN-only** (per-locale 404s need hosting config); the TR 404 copy exists in
  the dictionaries if it ever gets its own page.
- Keep the lowercase-heading brand voice in Turkish translations; the TR 404 typo
  ("haatalarımı") mirrors the EN "msitakes" joke.

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
