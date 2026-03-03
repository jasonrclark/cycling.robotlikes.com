# cycling.robotlikes.com

A personal cycling and walking statistics visualization website powered by [Strava](https://www.strava.com/). Displays charts for ride/walk distance, speed, and cumulative totals over time using [Chart.js](https://www.chartjs.org/).

Live site: [cycling.robotlikes.com](https://cycling.robotlikes.com)

## Overview

- **`index.html`** — Cycling stats: per-ride distance, cumulative distance, average speed
- **`walking.html`** — Walking stats: per-walk distance, cumulative distance
- **`rides.json`** — Stored cycling activity data fetched from Strava
- **`walks.json`** — Stored walking activity data fetched from Strava
- **`code.js`** — Shared JavaScript for charting and display helpers
- **`serve.rb`** — Local WEBrick server that handles Strava OAuth and triggers data updates
- **`do-it`** — Shell script to start the local server
- **`latest`** — Ruby script to fetch new rides from Strava and append them to `rides.json`
- **`new-to-old.sh`** — Helper script using `jq` to inspect `new-rides.json`

## Setup

### Prerequisites

- Ruby (with Bundler)
- A [Strava API application](https://www.strava.com/settings/api)

### Install dependencies

```sh
bundle install
```

### Configure Strava credentials

Create a `tmp/env.sh` file (this file is gitignored) with your Strava API credentials:

```sh
export STRAVA_CLIENT_ID=your_client_id
export STRAVA_CLIENT_SECRET=your_client_secret
```

## Local Development

Start the local server (sources `tmp/env.sh` automatically):

```sh
./do-it
```

The server runs on port 9090. It will print a Strava authorization URL to the terminal. Open that URL in your browser to authorize the app and trigger a data fetch.

When the OAuth callback is received at `/auth`, the server will:
1. Exchange the authorization code for an access token
2. Run `latest` to fetch new rides from Strava and update `rides.json`
3. Commit and push the updated `rides.json` to `main`

If running in a GitHub Codespace, the server automatically uses the Codespace forwarding URL for the redirect.

## Deployment

The site is deployed automatically to [GitHub Pages](https://pages.github.com/) on every push to `main` via the workflow in `.github/workflows/static.yml`. The entire repository is published as the static site.
