# BJN Photography

Photography portfolio for **Billy Ndizeye** — tech events, portraits, and culture photography in Chicago. *People. Culture. Community.*

**Live:** https://bjtheartist.github.io/photography-portfolio/

## Design — "The Darkroom"

Dark cinematic editorial built around the photographs:

- True black / paper white / safelight red palette
- Big Shoulders Display (Chicago's civic typeface) + Archivo + Space Mono
- Loader with developing counter, Ken Burns hero slideshow
- Lenis smooth scroll on the GSAP ticker, ScrollTrigger reveals
- Filterable masonry gallery with full-screen lightbox (keyboard + swipe)
- "Shot in Chicago" parallax skyline interlude with flag-star motif
- Scroll-scrubbed approach statement, services index, bio, booking form
- Film grain overlay, safelight cursor dot, fullscreen mobile menu

## Tech Stack

- React 19 + TypeScript + Vite 6
- Tailwind CSS 4 (tokens) + custom CSS system in `src/index.css`
- GSAP + ScrollTrigger, Lenis
- FormSubmit for booking inquiries (mailto fallback)
- GitHub Pages via Actions (`.github/workflows/deploy.yml`, deploys on push to `main`)

## Local Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build to dist/
npm run lint     # tsc --noEmit
```

## Structure

- `src/App.tsx` — orchestrator (also routes `#tagger` to the image tagging dev tool)
- `src/components/` — Loader, Header, Hero, Marquee, Gallery, Lightbox, Chicago, CultureStrip, Approach, Bio, Testimonials, Booking, Footer, Cursor
- `src/lib/shared.tsx` — assetUrl (GH Pages base), ChiStar, useLenis
- `src/data/galleryImages.ts` — image manifest with categories and covers
- `public/` — photographs (portraits, creative, events, hero)
