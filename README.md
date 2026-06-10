# Yojika — marketing site

Marketing site for **Yojika**, offline-first GST billing software for Indian small shops.
Built with **Astro + Tailwind CSS** (React islands for interactive bits), ported from the
Claude Design prototype. Canonical domain: **yojika.in** (`.com` 301-redirects to `.in`).

## Stack

- [Astro 4](https://astro.build) — static output, file-based routing, great SEO/perf
- Tailwind CSS 3 (`tailwind.config.cjs` — brand tokens lifted from the design)
- React 18 islands (`client:load`) for the header menu, FAQ accordion, reveal-on-scroll,
  and the waitlist / contact forms
- IBM Plex Sans + IBM Plex Mono (loaded from Google Fonts in `src/layouts/Base.astro`)

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output to ./dist
npm run preview  # serve the production build locally
```

## Structure

```
src/
  layouts/Base.astro          # <head>, fonts, shared Header + Footer
  pages/                      # one .astro file per route (index, features, pricing, …)
  components/
    icons.jsx                 # inline SVG icon set
    ui.jsx                    # Link, Button, Container, Reveal, Card, Field, WaitlistForm…
    mockups.jsx               # div-built product UI mockups (billing screen, invoice, …)
    chrome.jsx                # Header (mobile menu) + Footer
    shared.jsx                # FAQ accordion + closing waitlist CTA (reused across pages)
    pages/                    # Home / Features / Pricing / Download / About / Contact
  styles/global.css           # reveal/hatch/dotgrid/font-num + body styles
public/                       # favicon.svg, robots.txt
```

## To do before launch

- **Forms**: the waitlist and contact forms validate client-side and show a success state,
  but don't yet POST anywhere. Wire them to `/api/waitlist` and `/api/contact`
  (Cloudflare Pages Functions + D1, per the project plan).
- **Download**: the "Download for Windows (.exe)" button is a placeholder
  (`Download.jsx`) — point it at the real installer (Cloudflare R2 or GitHub Releases).
- **Self-host fonts** (optional perf win) instead of the Google Fonts `<link>`.
- **Deploy**: Cloudflare Pages connected to this repo; add `yojika.in` (canonical) and a
  301 redirect from `yojika.com`.
