# Yokai House Tattoo — San Diego

Static website for Yokai House, a Japanese-inspired custom tattoo studio in San Diego.

## Run locally
No build step. Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

## Files
- `index.html` — page markup and the inline SVG artwork (oni, kitsune, lanterns)
- `styles.css` — theme tokens, layout, animations, responsive rules
- `script.js` — flash "Bestiary" cards and legend modal, filters, mobile nav, scroll reveals, booking form
- `assets/favicon.svg`

## Placeholder content to replace before launch
- Address, phone, email (`hello@yokaihouse.com`) and hours in the **Visit** section
- Artist names/bios in the **Artists** section
- Instagram / TikTok links in the footer
- Stats ("12 years", "4 artists"), shop minimum, and flash prices
- The booking form opens the visitor's email app (`mailto:`). Swap it for Formspree, Netlify Forms, or a booking tool if you'd like submissions collected directly.

## Deploy
Works as-is on GitHub Pages, Netlify, Vercel or any static host.
