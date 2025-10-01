# Dynamic Weather Dashboard

## Project Title
**Real-Time Location-Based Weather Information System**

A single-page, responsive weather dashboard that provides real-time, location-based weather information in a simple interface. Built with HTML, CSS, and vanilla JavaScript, it fetches and displays essential weather data including temperature, current conditions, and forecasts to enhance user convenience and travel planning.

The dashboard uses Open‑Meteo's free APIs for geocoding and forecasts, and renders a dynamic, animated background on a full‑screen canvas (sun, clouds, stars, rain, snow, lightning) to match current conditions. The UI is optimized for mobile through desktop with responsive design principles.


## Features

- Location
  - Uses browser geolocation on first load; falls back to New Delhi, IN if denied/unavailable.
  - State → City selectors for India (with common alias handling, e.g., Bangalore → Bengaluru).
- Current Conditions
  - Temperature, feels like, humidity, wind speed, visibility, and a human‑readable description.
  - Distinct visuals for sunny, partly cloudy, overcast, drizzle/rain, snow, and thunderstorms.
  - Clear‑night only stars: stars are hidden for overcast/rain/drizzle/snow/fog/thunder/storm at night.
- Forecasts
  - Next 7 days (Open‑Meteo forecast API).
  - Past 7 days (Open‑Meteo archive API) via the "Past 7 Days" button.
  - Click a forecast card to preview that day in the header.
  - Icon fallbacks so "Unknown" conditions still show a sensible icon.
- Responsive UI
  - Mobile: stacked layout; compact forecast grid.
  - Desktop (≥1000px): compact centered card (max width 720px) with normal page scrolling.
  - Safeguards for short desktop heights to prevent clipping.
- No API keys required (Open‑Meteo is free and keyless).


## Quick start (local preview)

You only need a static file server so the page can load assets correctly.

- Option A: VS Code + Live Server extension (recommended)
  - Open this folder in VS Code.
  - Install "Live Server" and click "Go Live", or right‑click `index.html` → "Open with Live Server".

- Option B: Python (already available on most systems)

```powershell
# From the project folder
type .\index.html > $null  # no-op; just to ensure you're in the right directory
python -m http.server 8000
# Then open http://localhost:8000 in your browser
```

- Option C: Node http-server (optional)

```powershell
npm i -g http-server
http-server -p 8000
```


## File structure

```
ibmskillbuild/
├─ index.html   # Markup structure; canvas and UI sections
├─ style.css    # All layout, responsive rules, and component styles
├─ script.js    # Data fetch, UI updates, and canvas animations
└─ README.md
```


## Algorithm & Deployment

### Weather Data Processing
- Define weather categories and mapping (clear, cloudy, rainy, snowy conditions).
- API response parsing for temperature, humidity, wind speed data.

### Frontend Design
- Layout using HTML and CSS (flexbox & grid for responsive cards).
- Canvas-based animated backgrounds matching weather conditions.

### Interactive Features
- Location selection with geolocation API integration.
- Real-time weather data fetching and display updates.
- Weather condition filtering and forecast navigation.
- Modal-like forecast card previews with detailed information.

### Testing
- Cross-browser compatibility (Chrome, Firefox, Safari, Edge).
- Mobile responsiveness across different screen sizes.
- API error handling and fallback mechanisms.

### Deployment
- Host using GitHub Pages / Netlify for free and easy access.
- Static site deployment with no build process required.
- CDN integration for weather icons and fonts.

## How it works

- Data flow
  1. On load, the app tries `navigator.geolocation`. If allowed, it requests the current weather for your coordinates; otherwise it falls back to New Delhi.
  2. Selecting State/City performs geocoding via Open‑Meteo's geocoding API, preferring India, then requests a 7‑day forecast.
  3. Past 7 days uses Open‑Meteo's archive API for the selected coordinates.

- Weather mapping
  - `script.js` maps Open‑Meteo weather codes to readable descriptions and corresponding icons.
  - Drizzle is rendered lighter and sparser than rain.
  - Overcast clouds are denser/darker than partly cloudy.
  - Stars are drawn only on clear/mostly clear nights.

- Canvas animation
  - The `canvas` is fixed to the viewport and repainted every frame with a gradient based on condition + time of day.
  - Layers: stars → clouds → sun (daytime clear) → precipitation (drizzle/rain/snow) → lightning flashes.

- Layout
  - `style.css` contains mobile‑first styles, then media queries.
  - For ≥1000px: `.weather-app` uses `max-width: 720px; margin: 40px auto;` so the page can scroll normally while the background remains full‑screen.


## Configuration and customization

- Default location
  - Update the fallback in `script.js` (search for "New Delhi, India") to your preferred city.

- State ↔ City lists and aliases
  - Extend `stateCities` and `cityAliases` in `script.js` to add more locations or alternative names.

- Visual theme
  - Gradients and particle counts live in `animate()`, `initParticles()`, and `initClouds()`.
  - Typography and spacing are adjusted under the `@media (min-width: 1000px)` block in `style.css`.

- Icons
  - Icons are loaded from Icons8 CDN. You can replace the URLs in `icons` (in `script.js`) with your own assets.


## Deployment

This is a static site; any static hosting works:
- GitHub Pages: push this folder to a repo, enable Pages, and point it at the `main` branch root.
- Netlify/Vercel/Cloudflare Pages: drag‑and‑drop the folder or connect the repo. No build step required.
- Azure Static Web Apps, S3/CloudFront, etc. are equally fine.


## Troubleshooting

- Page doesn't scroll on desktop
  - Ensure you're on the latest CSS: the `.weather-app` block under `@media (min-width: 1000px)` should not be `position: fixed;`.

- Stars visible during overcast/rain at night
  - Clear your cache (Ctrl+F5). The current `drawStars()` hides stars for non‑clear conditions at night.

- Geolocation denied or inaccurate
  - Use the State/City selectors to fetch precise data for your area.

- "Unknown" description
  - That usually means a weather code wasn't mapped. The UI falls back to a sensible icon; you can extend `weatherCodes` in `script.js` if needed.

- CORS/network errors
  - Open‑Meteo allows client‑side calls. If you see transient failures, try again; no API key is required.


## Known limitations

- The state/city pickers are focused on India; you can expand the lists as needed.
- Icons are fetched from a third‑party CDN (network required). Bundle locally if you need offline use.
- No service worker/offline caching is included by default.


## Contributing

- Keep CSS edits scoped and avoid reformatting unrelated regions.
- When changing selector names or structure, review both `index.html` and `script.js` for matching hooks.
- Prefer small, testable changes and manual smoke‑tests in a local server session.


## Acknowledgements

- Weather data: [Open‑Meteo](https://open-meteo.com/)
- Icons: [Icons8](https://icons8.com/)
- Font: Inter by Rasmus Andersson & The Inter Project


## License

No license has been specified. If you plan to publicly distribute this project, consider adding a `LICENSE` file (MIT, Apache‑2.0, etc.).