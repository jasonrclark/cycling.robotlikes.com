# cycling.robotlikes.com

A personal cycling stats site that visualizes ride data pulled from [Strava](https://www.strava.com/). Deployed to GitHub Pages at [cycling.robotlikes.com](https://cycling.robotlikes.com).

## What it does

- Displays charts for per-ride distance, cumulative distance, and average speed over time
- Shows vanity stats: max distance, average distance, total miles, total hours, total days, and top speed
- Also tracks walking data at [/walking.html](https://cycling.robotlikes.com/walking.html)

## Structure

| File/Dir | Purpose |
|---|---|
| `index.html` | Main cycling stats page |
| `walking.html` | Walking stats page |
| `code.js` | Shared chart rendering logic |
| `rides.json` | Stored ride data |
| `walks.json` | Stored walk data |
| `latest` | Ruby script to fetch new rides from Strava and append them to `rides.json` |
| `serve.rb` | Local dev server that handles Strava OAuth and triggers `latest` |
| `do-it` | Convenience script to start the local server (sources env vars, then runs `serve.rb`) |
| `new-to-old.sh` | Helper to reformat raw Strava API output (`new-rides.json`) for inspection |
| `.github/workflows/static.yml` | GitHub Actions workflow to deploy the site to GitHub Pages |

## Updating ride data

Ride data is updated by going through the Strava OAuth flow locally:

1. Copy `tmp/env.sh.example` to `tmp/env.sh` and fill in your `STRAVA_CLIENT_ID` and `STRAVA_CLIENT_SECRET`.
2. Install dependencies: `bundle install`
3. Run the local server: `./do-it`
4. Open the printed Strava authorization URL in a browser and authorize the app.
5. The server handles the OAuth callback, calls `latest` to fetch new rides, and commits + pushes the updated `rides.json` to `main`.

## Deployment

Every push to `main` automatically deploys the static site to GitHub Pages via the workflow in `.github/workflows/static.yml`.
