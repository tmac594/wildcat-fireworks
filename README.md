# 🎆 Sky King Fireworks — Catalog Website

A mobile-first product catalog for your fireworks stand. No backend, no accounts, no checkout — just a fast, beautiful product browser.

---

## Quick Start

This site is a **single HTML file** — just open it in any browser.

```
fireworks-stand/
├── index.html          ← The entire website (open this)
├── public/
│   ├── products.json   ← Edit this to update your catalog
│   ├── videos/         ← Drop .mp4 demo videos here
│   └── images/         ← Drop product thumbnail images here
```

### Option 1 — Open directly
Double-click `index.html` — works instantly. Videos and images won't load locally due to browser security rules, but the rest of the site works perfectly.

### Option 2 — Run a local server (recommended for videos)
If you have Python installed:
```bash
cd fireworks-stand
python3 -m http.server 8080
```
Then open: http://localhost:8080

Or use VS Code's **Live Server** extension.

### Option 3 — Host online
Upload the entire `fireworks-stand/` folder to any static host:
- **Netlify** — drag and drop the folder at netlify.com/drop
- **GitHub Pages** — push to a repo, enable Pages
- **Vercel** — `vercel deploy` from the folder

---

## Adding / Editing Products

Edit `public/products.json`. Each product looks like this:

```json
{
  "id": "unique-id",
  "name": "Product Name",
  "price": 49.99,
  "category": "500g Cakes",
  "description": "Short customer-friendly description.",
  "videoUrl": "/public/videos/product-name.mp4",
  "thumbnailUrl": "/public/images/product-name.jpg",
  "tags": ["Loud", "Colorful", "Staff Pick"]
}
```

### Valid Categories
- `500g Cakes`
- `200g Cakes`
- `Artillery Shells`
- `Fountains`
- `Roman Candles`
- `Novelties`
- `Family Friendly`

### Valid Tags
| Tag | Color in app |
|-----|-------------|
| `Staff Pick` | Gold |
| `Loud` | Red |
| `Colorful` | Purple |
| `Family Friendly` | Teal |
| `Best Value` | Green |
| `Finale` | Orange |

---

## Adding Videos

1. Export/save your demo video as `.mp4` (H.264 recommended for broad compatibility).
2. Drop the file into `public/videos/`.
3. Set `"videoUrl": "/public/videos/your-file-name.mp4"` in products.json.

Videos use standard HTML5 controls — no autoplay, muted, or streaming required.

---

## Adding Product Images

1. Save a product photo as `.jpg` or `.png`.
2. Drop it into `public/images/`.
3. Set `"thumbnailUrl": "/public/images/your-file-name.jpg"` in products.json.

Recommended size: **400×300px** (4:3 ratio). The app shows a large emoji as a fallback if no image is set.

---

## Changing the Stand Name

Open `index.html` and find `Sky King Fireworks` — it appears in:
- The `<title>` tag near the top
- `.hero-title` text in the JSX (search for "Sky King")

Change both to your stand's name.

---

## Features

- ✅ Search by product name or description
- ✅ Filter by category (8 categories)
- ✅ Quick-filter chips: Staff Picks, Loud, Family Friendly, Best Value
- ✅ Sort by price or name
- ✅ Product detail modal with embedded video player
- ✅ Staff Pick gold badge on cards
- ✅ Tag badges on every card
- ✅ Works on phones, tablets, and desktop
- ✅ Dark fireworks theme, large tap targets

---

*Built for Sky King Fireworks. Edit freely.*
