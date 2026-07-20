## Overview

A dark-brown/black + orange themed Thassos hotel booking site with 5 pages, an editable YouTube video background on the home page, 200+ placeholder hotel cards, a "Free ferry tickets" offers page, a photo gallery, and a contact page. Domain purchase + redirect happens after publish (you don't own the domains yet).

## Pages & routes

```text
/               Home  — video bg + "Thassos accommodation by Thassos HORECA"
/accommodation  200+ hotel cards, search + filter
/offers         "Free ferry tickets" promo + eligible hotels
/gallery        Photo gallery grid (lightbox)
/contact        Contact info + form
```

Each route is a separate file under `src/routes/` with its own `head()` meta (title, description, og). A shared header/footer lives in `src/routes/__root.tsx` with the 5 nav links.

## Design

- Palette (tokens in `src/styles.css`):
  - background `#0f0b09` (dark brown-black)
  - surface / card `#1a120d`
  - primary (orange) `#ff7a1a`
  - primary-glow `#ffa24a`
  - foreground `#f4ece3`, muted `#a89684`
- Typography: display serif for headings (Playfair Display), Inter for body — loaded via `<link>` in `__root.tsx`.
- Buttons/cards use rounded-xl, warm orange glow shadow, subtle grain on hero.

## Home page

- Full-viewport YouTube background (muted, looped, autoplay) via an `<iframe>` using `youtube-nocookie.com/embed/{id}?autoplay=1&mute=1&loop=1&controls=0&playlist={id}`.
- Dark gradient overlay for legibility.
- Centered heading "Thassos Accommodation" + tagline "by Thassos HORECA".
- Row of 5 orange pill buttons linking to the pages.
- **Editable video**: the YouTube URL is stored in browser `localStorage` (key `home_video_url`) with a small "Change background video" gear button (bottom-right) that opens a modal to paste any YouTube/Vimeo URL. Change is instant, persists on the device, no backend needed. Default URL is a Thassos stock clip you can swap later.

## Accommodation page (200+ cards)

- 220 placeholder hotels generated at build time in `src/data/hotels.ts` (deterministic seed so cards are stable): name, town (Limenas, Potos, Skala Rachoni, Golden Beach, Aliki, Pefkari, Astris, Thassos Town, etc.), star rating, short description, phone, email, and a photo URL from Unsplash Source keyed by seed so each card has a unique Thassos-style image.
- Grid of `HotelCard` components (image, name, town, stars, price-from, phone, email, "View" button).
- Sticky filter bar: search by name, filter by town, sort by rating/price.
- Client-side pagination (24 per page) so the DOM stays light.
- Card detail: modal (not a per-hotel route) with larger photo + full contact block.

## Special offers page

- Hero: "Free ferry tickets with every booking" with terms bullet list (e.g. min 3 nights, Keramoti–Thassos route, per booking).
- Grid of the same `HotelCard`s flagged `offer: true` (about 40 of the 220), each with an orange "Free ferry" ribbon.

## Photo gallery

- Masonry grid of ~60 Thassos photos (Unsplash keyword-seeded URLs), click to open a lightbox with prev/next.

## Contact page

- Thassos HORECA contact block (phone, email, address — placeholder, you edit later).
- Simple contact form (name, email, message). Form submit shows a success toast; no backend wired yet (submissions logged to console). We can add real email delivery via Lovable Cloud in a later step if you want.

## Domain & redirect

You don't own the domains yet, so publish first, then:

1. Publish the site to its `.lovable.app` URL.
2. In Project Settings → Domains → **Buy new domain**, purchase `thassos-insula-booking.ro` (and optionally `thassos-island-booking.com`).
3. Connect `thassos-insula-booking.ro` to this project.
4. For the redirect `thassos-insula-booking.ro → thassos-island-booking.com`: Lovable connects one domain per project as the live site. To redirect the `.ro` to the `.com`, the `.com` should be the primary site (host it wherever the `.com` site lives) and the `.ro` should 301-redirect to it at the registrar/DNS level. If instead you want the `.ro` to *be* this Lovable site and the `.com` to redirect *to* the `.ro`, connect `.ro` here and set up the redirect on the `.com` registrar. I'll walk you through the exact clicks after publish once you tell me which domain should be the primary.

## Technical notes

- Files created:
  - `src/routes/__root.tsx` (updated: header/nav/footer, font links, theme meta)
  - `src/routes/index.tsx` (rewrite of placeholder)
  - `src/routes/accommodation.tsx`
  - `src/routes/offers.tsx`
  - `src/routes/gallery.tsx`
  - `src/routes/contact.tsx`
  - `src/data/hotels.ts` (220-hotel generator)
  - `src/data/gallery.ts` (~60 photo entries)
  - `src/components/HotelCard.tsx`, `src/components/HotelModal.tsx`, `src/components/VideoBackground.tsx`, `src/components/SiteHeader.tsx`, `src/components/SiteFooter.tsx`
  - Tokens added to `src/styles.css`
- No backend needed for v1. Everything is static + `localStorage` for the editable video URL.
- Placeholder photos use `https://images.unsplash.com/...` seeded queries — swap for real photos anytime by editing `src/data/hotels.ts`.

## Out of scope for this build

- Real booking flow / payments.
- Real email delivery for the contact form (can add via Lovable Cloud later).
- Multi-language (RO/EN/GR) — say the word and I'll add it.
