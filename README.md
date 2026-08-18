# mrcn.tr

Personal portfolio website of Emre Can Çorapcı — live at <https://mrcn.tr>.

Bilingual (English / Turkish), fully static, and ships almost zero client-side JavaScript.

## Stack

- [Astro 7](https://astro.build) — static output, file-based routing, content collections
- [Tailwind CSS v4](https://tailwindcss.com) — CSS-first config, class-based dark mode
- React 19 — server-rendered only (no `client:` directives, nothing hydrates)
- Zod-validated content collections (markdown + JSON)
- PostHog analytics (production only, self-hosted ingest)

## Features

- **Two locales**: English at `/` and Turkish at `/tr`, with hreflang alternates,
  per-locale `og:locale`, and EN-fallback redirects for untranslated pages
- **Theme**: dark by default with a pre-paint no-FOUC script and a header toggle
  (`localStorage` + `prefers-color-scheme`)
- **Content-driven**: projects, experiences, and skills live in content collections;
  the home page "featured" sections are derived from frontmatter flags, never hardcoded
- **SEO**: canonical URLs, Open Graph / Twitter meta, generated `robots.txt`,
  sitemap with locale alternates
- **Performance**: preloaded variable font via the Astro Fonts API, optimized responsive
  images (`<Picture>` + sharp), link prefetching

## Getting started

Requires Node >= 24 and pnpm >= 11.

```bash
pnpm install
pnpm dev        # start the dev server at localhost:4321
```

Optional environment variables (see `.env.example`): `PUBLIC_POSTHOG_KEY`,
`PUBLIC_POSTHOG_HOST` — analytics only loads in production builds and falls back to
bundled defaults.

## Commands

| Command         | Description                                              |
| --------------- | -------------------------------------------------------- |
| `pnpm dev`      | Dev server                                               |
| `pnpm build`    | Production build to `dist/`                              |
| `pnpm preview`  | Preview the built site                                   |
| `pnpm check`    | `astro check` — TypeScript diagnostics incl. `.astro`     |
| `pnpm lint`     | Biome lint + format check (`src/**/*.{ts,tsx,md,json,css}`) |
| `pnpm format`   | Prettier (`.astro`) + Biome format (everything else)     |

There is no test framework; `pnpm build && pnpm check && pnpm lint` is the verification
layer. Run all three before committing.

## Project structure

```
src/
├── pages/          # Routes: EN pages + /tr mirrors (thin wrappers)
├── layouts/        # base (HTML shell/meta), layout (chrome), left-column
├── components/     # Shared UI + layout chrome (header, footer, toggles)
├── data/           # Content collections (markdown + JSON)
├── i18n/           # UI string dictionaries + locale helpers
├── lib/            # cn(), content helpers, locale filtering helpers
├── schemas/        # Zod schemas for all collections
├── images/         # Image sources, optimized through astro:assets
└── styles/         # global.css — Tailwind v4 tokens, both theme palettes
```

Detailed architecture notes, conventions, and known quirks live in
[AGENTS.md](./AGENTS.md) — read it before making non-trivial changes.

## Editing content

**Projects and experiences** are markdown files with Zod-validated frontmatter:

- `src/data/projects/name.md` (English) and `src/data/projects/name.tr.md` (Turkish)
- `src/data/experiences/name.md` / `name.tr.md`
- Slugs are shared across locales; a missing `.tr.md` falls back to English

**Skills and project types** are JSON with localized titles
(`{ "en": "...", "tr": "..." }` — both required, a missing translation fails the build):

- `src/data/skills.json`
- `src/data/projects/types.json`

**UI strings** (navigation, headings, buttons, footer, 404) live in
`src/i18n/ui/en.ts` and `src/i18n/ui/tr.ts`. The Turkish dictionary is typed against the
English keys, so a missing key is a build-time error.

## Deployment

Static output in `dist/`. Point any static host at it — the site is served from the
repository root domain `mrcn.tr`.

## License

[MIT](./LICENSE.md) © Emre Can Çorapçı
