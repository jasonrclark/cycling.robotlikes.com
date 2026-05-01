# cycling.robotlikes.com

A personal cycling stats website that visualizes ride data pulled from [Strava](https://www.strava.com/). Deployed to GitHub Pages at [cycling.robotlikes.com](https://cycling.robotlikes.com).

## What it does

Displays charts and summary stats for cycling (and walking) activity:

- **Per-ride distance** – bar chart of each ride's distance in miles
- **Cumulative distance** – scatter chart of total miles over time
- **Average speed** – scatter chart of average speed per ride

Summary vanity stats include max distance, average distance, ride count, total miles, total hours, total days, and max/average speed.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Main cycling stats page |
| `walking.html` | Walking stats page |
| `code.js` | Shared charting/display logic |
| `rides.json` | Processed cycling ride data |
| `walks.json` | Processed walking data |
| `latest` | Ruby script to fetch new rides from Strava and append to `rides.json` |
| `serve.rb` | Local WEBrick server that handles the Strava OAuth callback and triggers a data refresh |
| `do-it` | Shell script to source env vars and start `serve.rb` |
| `new-to-old.sh` | `jq` snippet to convert raw Strava activity JSON to the old ride format |
| `raw-rides.json` | Raw Strava API response (scratch data) |
| `new-rides.json` | Intermediate new-rides file |

## Updating ride data

Ride data is updated by re-authorizing with Strava via OAuth:

1. Copy `.env` credentials into `tmp/env.sh` (Strava client ID and secret).
2. Run `./do-it` — this starts a local server and prints a Strava authorization URL.
3. Open the URL in a browser and authorize the app.
4. The callback handler fetches new activities, updates `rides.json`, and commits + pushes the result.

### Environment variables

| Variable | Description |
|----------|-------------|
| `STRAVA_CLIENT_ID` | Your Strava API application client ID |
| `STRAVA_CLIENT_SECRET` | Your Strava API application client secret |

## Local development

```bash
bundle install
# then open index.html directly in a browser, or serve with any static file server
```

## Deployment

Pushes to `main` automatically deploy the site to GitHub Pages via the workflow in `.github/workflows/static.yml`.
