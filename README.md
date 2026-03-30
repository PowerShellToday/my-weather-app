# PAHUL Weather

A fast, accessible weather app built with Vite, React, TypeScript, and shadcn/ui. Search any city to get current conditions and a 5-day forecast, with gradients that shift to match the weather.

## Features

- **Current weather** — temperature, feels-like, humidity, wind speed, and a weather icon
- **5-day forecast** — daily high/low with representative icons
- **Dynamic gradients** — background shifts across 8 weather conditions (clear, partly cloudy, cloudy, rainy, stormy, snowy, foggy, windy)
- **Geolocation** — offers to detect your city on first load using the browser Geolocation API and OpenWeatherMap Reverse Geocoding
- **Recent searches** — last 5 cities saved to localStorage as quick-access pill buttons
- **Dark / light mode** — toggle in the header; defaults to system preference, persists to localStorage
- **Fully responsive** — mobile, tablet, and desktop
- **WCAG-compliant** — labelled form fields, `aria-live` regions, programmatic focus management, keyboard navigation

## Tech stack

| Layer | Library |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite 8 |
| Styling | Tailwind CSS v4 |
| UI components | shadcn/ui (Button, Input, Card) |
| Font | Geist Variable |
| Weather data | OpenWeatherMap API |
| CI/CD | GitHub Actions → GitHub Pages |

## Project structure

```
src/
├── components/
│   ├── ui/                  # shadcn-managed components (Button, Input, Card)
│   ├── GeoPrompt.tsx        # Geolocation offer / status banner
│   ├── Header.tsx           # App title + dark mode toggle
│   ├── RecentSearches.tsx   # Recent city pill buttons
│   ├── SearchBar.tsx        # Search form
│   └── WeatherDisplay.tsx   # Current weather + 5-day forecast cards
├── hooks/
│   ├── useDarkMode.ts       # Reads system pref, persists to localStorage, toggles .dark on <html>
│   ├── useGeolocation.ts    # State machine: prompt → locating → dismissed / denied / error
│   ├── useRecentSearches.ts # localStorage-backed list, max 5, case-insensitive dedup
│   └── useWeather.ts        # Wraps fetchWeather with loading / error state
├── lib/
│   ├── api.ts               # OpenWeatherMap calls (geocoding, current, forecast, reverse geocoding)
│   ├── utils.ts             # shadcn cn() helper
│   └── weather.ts           # 8-condition gradient map (background, card, text, accent)
├── types/
│   └── weather.ts           # WeatherCondition, WeatherData, ForecastDay
└── App.tsx                  # State composition root
```

## Getting started

### Prerequisites

- Node.js 22+
- An [OpenWeatherMap API key](https://openweathermap.org/api) (free tier is sufficient)

### Local development

```bash
# 1. Clone the repo
git clone https://github.com/<your-username>/my-weather-app.git
cd my-weather-app

# 2. Install dependencies
npm install

# 3. Add your API key
echo "VITE_WEATHER_API_KEY=your_key_here" > .env

# 4. Start the dev server
npm run dev
```

Open `http://localhost:5173`.

### Available scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Type-check and produce optimised `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

## API calls

All requests go to `https://api.openweathermap.org`. The app makes three calls per search:

1. **Direct geocoding** — converts a city name to lat/lon
   `GET /geo/1.0/direct?q={city}&limit=1`
2. **Current weather** — temperature, condition, humidity, wind
   `GET /data/2.5/weather?lat={lat}&lon={lon}&units=metric`
3. **5-day forecast** — 3-hour intervals grouped into daily high/low
   `GET /data/2.5/forecast?lat={lat}&lon={lon}&units=metric`

On first load, if the user grants permission, a fourth call is made:

4. **Reverse geocoding** — converts browser GPS coordinates to a city name
   `GET /geo/1.0/reverse?lat={lat}&lon={lon}&limit=1`

The API key is read from `import.meta.env.VITE_WEATHER_API_KEY` and is never committed to source control.

## Deployment (GitHub Pages)

The workflow at `.github/workflows/deploy.yml` runs on every push to `main`:

1. Checks out the repo and sets up Node 22
2. Runs `npm ci`
3. Builds with `npm run build`, injecting `VITE_WEATHER_API_KEY` from repository secrets and setting `BASE_PATH=/<repo-name>/` so Vite asset paths resolve correctly on Pages
4. Uploads `dist/` and deploys via `actions/deploy-pages`

### One-time setup

1. **Repo Settings → Pages → Source** — set to **GitHub Actions**
2. **Repo Settings → Secrets and variables → Actions** — add `VITE_WEATHER_API_KEY` with your key

After the first successful run the app is live at:
`https://<your-username>.github.io/my-weather-app/`
