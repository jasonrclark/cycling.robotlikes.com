# cycling.robotlikes.com

A personal fitness stats site that visualizes cycling and walking activities pulled from [Strava](https://www.strava.com/). Deployed to GitHub Pages at [cycling.robotlikes.com](https://cycling.robotlikes.com).

## What It Does

- **Cycling page** (`index.html`): Charts ride distance per ride, cumulative total distance, and average speed over time, with vanity stats (max, average, count, totals).
- **Walking page** (`walking.html`): Charts walk distance per walk and cumulative total distance.
- Charts support drag-to-zoom on the time axis via Chart.js + chartjs-plugin-zoom.

## File Structure

```
index.html        # Cycling stats page
walking.html      # Walking stats page
code.js           # Shared Chart.js charting and vanity stat helpers
rides.json        # Cycling activity data
walks.json        # Walking activity data
latest            # Ruby script: fetches new rides from Strava and appends to rides.json
serve.rb          # Local WEBrick server for Strava OAuth flow
do-it             # Shell script: loads env vars and runs serve.rb
new-to-old.sh     # jq helper to inspect raw Strava activity shape
raw-rides.json    # Raw Strava API response (scratch file)
new-rides.json    # Intermediate new rides data (scratch file)
site              # One-liner to serve the site locally without OAuth
Gemfile           # Ruby dependencies
.github/workflows/static.yml  # GitHub Pages deployment workflow
```

## Strava API Setup

1. Create a [Strava API application](https://www.strava.com/settings/api).
2. Note your **Client ID** and **Client Secret**.
3. Create `tmp/env.sh` (this file is gitignored) with:
   ```sh
   export STRAVA_CLIENT_ID=your_client_id
   export STRAVA_CLIENT_SECRET=your_client_secret
   ```

## Local Development

Install Ruby dependencies:

```sh
bundle install
```

To serve the site locally (no OAuth):

```sh
sh site
# Open http://localhost:8000
```

## Updating Ride Data

The `latest` script fetches activities from Strava that occurred after the most recent ride in `rides.json` and appends them.

1. Ensure `tmp/env.sh` exists with your Strava credentials (see above).
2. Run the OAuth flow:
   ```sh
   ./do-it
   ```
   This starts a local server on port 9090 and prints a Strava authorization URL. Open the URL in your browser and authorize the app. The callback will automatically fetch new rides, update `rides.json`, commit, and push to `main`.

> **GitHub Codespaces**: `serve.rb` automatically detects `CODESPACE_NAME` and uses the Codespaces port-forwarding URL for the OAuth redirect.

## Deployment

The site is deployed automatically to GitHub Pages on every push to `main` via `.github/workflows/static.yml`. No build step is required — the entire repository is uploaded as a static artifact.
