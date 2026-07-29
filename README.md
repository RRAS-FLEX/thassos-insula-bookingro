# Thassos HORECA

Accommodation booking site for Thassos Island, Greece — hotels, studios and villas, a special offers page, a photo gallery, and a contact page. Built with [TanStack Start](https://tanstack.com/start) (React + SSR), Tailwind CSS, and shadcn/ui.

## Getting started

This project uses [Bun](https://bun.sh).

```bash
bun install       # install dependencies
bun run dev        # start the dev server
bun run build       # production build
bun run preview     # preview the production build locally
bun run lint         # run eslint
```

## Editing site content

Most of the hand-written site copy — navigation labels, footer/contact info, page headings and descriptions, page `<title>`/meta descriptions, and the special-offers terms list — lives in one file:

```
src/data/content.json
```

Edit values there and the corresponding pages update automatically; no need to touch component code for text changes.

`src/data/hotels.ts` and `src/data/gallery.ts` are **not** part of `content.json`:

- `hotels.ts` exports an empty `HOTELS` array (and the real list of Thassos towns used by the filter dropdown). The Accommodation and Offers pages show a "coming soon" empty state until real listings are added — add real `Hotel` objects to the array to populate them (see the `Hotel` type in that file for the shape).
- `gallery.ts` is a placeholder generator pulling ~50 stock Unsplash photo URLs, meant to be replaced with real Thassos photos.

## Project structure

- `src/routes/` — one file per page (file-based routing via TanStack Router). `__root.tsx` is the shared app shell (header/footer/head tags).
- `src/components/` — page components and `ui/` (shadcn/ui primitives).
- `src/data/` — content, hotel listings, and the placeholder gallery dataset.
- `src/server.ts` / `src/start.ts` — SSR entry and error-handling middleware.

## Deployment

The build uses Nitro (configured through `@lovable.dev/vite-tanstack-config` in `vite.config.ts`), which auto-detects its deploy target from the build environment — no target-specific config needed. Deployed on [Vercel](https://vercel.com), Git-connected: pushes to the connected branch build and deploy automatically. Build command: `bun run build`.
