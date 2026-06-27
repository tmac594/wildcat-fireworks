# Wildcat Fireworks — Project Brief

**Read this first.** This file gives you (or a Cowork agent) the full picture of what this project is, how it's built, and what's left to do.

---

## What this is

A mobile-first product catalog website for **Wildcat Fireworks**, a family fireworks stand in **Idalou, Texas**. Customers browse it on their phones while standing at the stand. It is a *catalog only* — no cart, no checkout, no payments, no accounts, no inventory tracking. By design.

## Current state: working

The site is **fully functional right now**. Open `index.html` in any browser and it runs — no build step, no server, no dependencies. It's pure HTML/CSS/vanilla JavaScript in a single file.

## Branding

- Colors: Idalou green (`#1A6B1A`) + gold (`#F5C000`) on a near-black green background. Defined as CSS variables in the `:root` block near the top of `index.html`.
- The real Wildcat Fireworks logo is embedded directly in `index.html` as a base64 data URI (so it loads with no server). The original is also saved at `public/wildcat-logo.jpg`.

## File structure

```
fireworks-stand/
├── index.html          ← THE ENTIRE SITE (HTML + CSS + JS + embedded logo)
├── README.md           ← End-user setup/hosting notes
├── PROJECT_BRIEF.md    ← This file
└── public/
    ├── products.json   ← Catalog data (currently a REFERENCE copy — see note below)
    ├── wildcat-logo.jpg
    ├── videos/         ← Drop .mp4 demo videos here
    └── images/         ← Drop product thumbnail photos here
```

### Important note about the data

Right now the product catalog lives in **two places**:
1. A JavaScript array called `PRODUCTS` near the bottom of `index.html` (this is what the site actually reads).
2. `public/products.json` (a reference copy, not yet wired up).

This was done so the site works with zero setup. **A good first dev task** is to make `index.html` load `products.json` via `fetch()` so there's a single source of truth. (This requires running a local server — see below — because browsers block `fetch` on `file://`.)

## How to run locally

Easiest: in the project folder, run a tiny web server.

```bash
# Python (already on most Macs/Linux)
python3 -m http.server 8080
# then open http://localhost:8080
```

Or use the VS Code "Live Server" extension (right-click index.html → Open with Live Server).

Videos and the `products.json` fetch only work when served this way, not when double-clicking the file.

---

## Adding videos & photos

1. Export each demo as `.mp4` (H.264 codec = best compatibility).
2. Put it in `public/videos/`, named to match the `videoUrl` in the data (e.g. `titans-thunder.mp4`).
3. Same for photos → `public/images/`, matching `thumbnailUrl`.

Until a real photo is added, each product shows a large emoji placeholder. That's intentional and fine.

---

## Features already built

- Search by product name / description / category
- 8 category cards: 500g Cakes, 200g Cakes, Artillery Shells, Fountains, Roman Candles, Novelties, Family Friendly, Staff Picks
- Quick-filter chips: Staff Picks, Loud, Family, Best Value
- Sort: price low→high, high→low, name A–Z
- Product cards with tags/badges, price, Staff Pick badge, ▶ Demo button
- Tap a card → slide-up modal with embedded HTML5 video player (no autoplay), full description, tags
- 15 sample products across all categories
- Fully responsive: phones, iPad, desktop

## Valid tags (and their badge colors)

`Staff Pick` (gold), `Loud` (red), `Colorful` (purple), `Family Friendly` (teal), `Best Value` (green), `Finale` (orange). Add new tags in the `TAG_CLASS` map in `index.html` plus a matching `.tag-*` CSS class.

---

## Suggested next steps / backlog

Things the owner may want to develop further:

1. **Wire up products.json** — single source of truth via `fetch()` (see data note above).
2. **Real photos & videos** — replace emoji placeholders.
3. **Hosting** — get it on a public URL (see options below).
4. Optional polish: a simple "filter by price range" slider; a "new this year" badge; printable price-list view; a small "find us / hours / map" footer section with the stand's address.
5. Optional admin convenience: a tiny build script or simple form that regenerates `products.json` so non-technical family members can update prices.

---

## Hosting options (all free for a static site)

This is a static site, so hosting is easy and free. Pick one:

- **Netlify Drop** (simplest, no account-juggling): go to https://app.netlify.com/drop and drag the whole `fireworks-stand` folder onto the page. Instant live URL. To update, drag again. Can connect a custom domain later.
- **Cloudflare Pages** or **Vercel** — similar, connect a GitHub repo and it auto-deploys on every change.
- **GitHub Pages** — free, good if you want version history. Push the folder to a repo, enable Pages in settings.

For an **iPad at the stand**: once hosted, just open the URL in Safari and tap Share → "Add to Home Screen" so it opens full-screen like an app. (No internet at the stand? Keep a copy of the folder on the iPad and open index.html directly — the logo is embedded so it still shows; only videos need the files present locally.)

---

*Built clean and dependency-free on purpose. Keep it simple — this is a tool for a fireworks stand, not a web app platform.*
