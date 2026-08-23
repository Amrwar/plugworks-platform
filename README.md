# Plugworks

The website for Plugworks, a creative and production house working out of Cairo
and Dubai. It is a single page: the studio, what it makes, where it works from,
and a form for getting in touch.

## Running it

```bash
npm install
npm run dev
```

The site is then on <http://localhost:3000>.

## Checks

```bash
npm run lint       # ESLint, via next lint
npm run typecheck  # tsc --noEmit
npm test           # Vitest
```

All three run in CI on every push and pull request to `main`.

## How it is put together

- `src/app` — the App Router entry: layout and metadata, the page itself, and
  the `loading`, `error` and `not-found` states, plus the generated
  `manifest`, `robots` and `sitemap`.
- `src/components` — the sections of the page. They hold markup and animation
  only; anything worth stating once lives in `src/data`.
- `src/data` — the content the page is built from: the navigation, the service
  list, the offices and the studio's own details. The header, the footer, the
  metadata and the structured data all read the same records, so they cannot
  drift apart.
- `src/lib` — the logic worth testing on its own: enquiry validation, the SEO
  helpers, the Organization structured data, the scroll-spy arithmetic and the
  marquee sizing.

Tests sit beside the modules they cover, as `*.test.ts`.

## Stack

Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Vitest.
