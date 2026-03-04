# cycling.robotlikes.com

A personal activity statistics visualization website for cycling and walking data pulled from [Strava](https://www.strava.com/). Hosted at [cycling.robotlikes.com](https://cycling.robotlikes.com) via GitHub Pages.

## Overview

- **Cycling page** (`index.html`) — charts per-ride distance, cumulative distance, and average speed
- **Walking page** (`walking.html`) — charts per-walk distance and cumulative distance
- Data is stored as JSON (`rides.json`, `walks.json`) and rendered client-side using [Chart.js](https://www.chartjs.org/)

## Strava Setup

Credentials are read from `tmp/env.sh` (not committed). Create that file:

```sh
mkdir -p tmp
cat > tmp/env.sh <<'EOF'
export STRAVA_CLIENT_ID=your_client_id
export STRAVA_CLIENT_SECRET=your_client_secret
EOF
```

You can find your client ID and secret in your [Strava API application settings](https://www.strava.com/settings/api).

## Local Development

Install Ruby dependencies:

```sh
bundle install
```

Start the local server (handles the Strava OAuth callback and data refresh):

```sh
./do-it
```

This sources `tmp/env.sh`, then starts a WEBrick server on port 9090. It prints a Strava authorization URL — visit it to kick off the OAuth flow. After authorization, new activities are fetched, appended to `rides.json`, and committed automatically.

If running in a GitHub Codespace, the server automatically uses the Codespace's forwarded URL for the OAuth redirect.

## Updating Ride Data

After completing the OAuth flow, the `latest` script is invoked automatically. It reads the most recent ride date from `rides.json`, queries the Strava API for any newer activities, converts units (meters → miles, m/s → mph), and appends them to `rides.json`.

## Deployment

The site deploys automatically to GitHub Pages via the workflow in `.github/workflows/static.yml` whenever changes are pushed to `main`.

## File Structure

```
.
├── index.html          # Cycling statistics page
├── walking.html        # Walking statistics page
├── code.js             # Shared Chart.js helpers for both pages
├── rides.json          # Stored cycling activity data
├── walks.json          # Stored walking activity data
├── latest              # Ruby script: fetch new rides from Strava API
├── serve.rb            # Ruby server: OAuth flow + triggers data refresh
├── do-it               # Shell script: loads env and starts serve.rb
├── new-rides.json      # Scratch file used when converting raw Strava exports
├── new-to-old.sh       # jq helper to reshape raw Strava export data
├── raw-rides.json      # Raw Strava API export (not used at runtime)
├── Gemfile             # Ruby dependencies
├── CNAME               # Custom domain for GitHub Pages
└── .github/
    └── workflows/
        └── static.yml  # GitHub Pages deployment workflow
```
