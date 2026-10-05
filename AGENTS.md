# TIMEZONE watch store
- Vite + React SPA, no backend, no secrets. Run: `docker compose -f docker-compose.base44.yml up -d`.
- Product data lives in `src/data/products.js` (shaped for later DB hookup). Watch/scene imagery is SVG (`src/components/WatchArt.jsx`), no photo assets.
- Favorites/cart persist in localStorage (`src/store.jsx`).
