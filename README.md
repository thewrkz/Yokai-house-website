# Yokai House — Tattoo, San Diego

Minimal, portfolio-first static site for Yokai House tattoo studio. Booking goes through Instagram DM, with email as an option.

## Edit content
Everything shown on the site is in **`site.config.js`**: name, Instagram handle, address, hours, intro, artists, portfolio photos and FAQ. Placeholder values are marked `TODO`.

- **Portfolio:** save photos from the shop's Instagram into `assets/work/` and add them to `work: [...]`. Until then the grid shows empty frames that link to Instagram.
- **Artists:** add entries to `artists: [...]`. The section stays hidden while the list is empty.
- **Email:** set `email` to show an "Email us" button next to "DM on Instagram".

## Run locally
```sh
python3 -m http.server 8000
```

## Deploy
Static files only. Works on GitHub Pages, Netlify, Vercel or any static host.
