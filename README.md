# cycling.robotlikes.com

A personal activity tracking site that visualizes cycling and walking data pulled from Strava. Hosted at [cycling.robotlikes.com](https://cycling.robotlikes.com) via GitHub Pages.

## Overview

The site displays interactive charts for:

- **Cycling** (`index.html`): per-ride distance, cumulative distance over time, and average speed
- **Walking** (`walking.html`): per-walk distance and cumulative distance over time

Data is stored as JSON and fetched client-side. Charts are rendered with [Chart.js](https://www.chartjs.org/) and support drag-to-zoom.

## File Structure

```
.
├── index.html          # Cycling stats page
├── walking.html        # Walking stats page
├── code.js             # Shared chart/display logic
├── rides.json          # Processed cycling data
├── walks.json          # Processed walking data
├── raw-rides.json      # Raw Strava API response data
├── new-rides.json      # Staging file for new ride imports
├── latest              # Ruby script: fetches new rides from Strava API
├── new-to-old.sh       # Shell helper to inspect raw ride data with jq
├── serve.rb            # Local dev server with Strava OAuth flow
├── do-it               # Wrapper script to start the local server
├── Gemfile             # Ruby dependencies
├── CNAME               # Custom domain for GitHub Pages
└── .github/workflows/
    └── static.yml      # GitHub Actions deploy workflow
```

## Strava API Setup

The `serve.rb` script handles the OAuth flow to obtain a Strava access token.

1. Create a Strava API application at [strava.com/settings/api](https://www.strava.com/settings/api).
2. Set the **Authorization Callback Domain** to `localhost`.
3. Create a `tmp/env.sh` file with your credentials (this file is gitignored):

   ```sh
   export STRAVA_CLIENT_ID=your_client_id
   export STRAVA_CLIENT_SECRET=your_client_secret
   ```

## Local Development

### Prerequisites

- Ruby (with Bundler)
- [jq](https://jqlang.github.io/jq/) (for `new-to-old.sh`)

### Install dependencies

```sh
bundle install
```

### Run the local server

```sh
./do-it
```

This sources `tmp/env.sh` and starts a WEBrick server on port 9090. Open the authorization URL printed to the console to authenticate with Strava.

Alternatively, to serve the static site without OAuth:

```sh
ruby -rwebrick -e'WEBrick::HTTPServer.new(:Port => 8000, :DocumentRoot => Dir.pwd).start'
```

## Updating Activity Data

After authenticating via the OAuth flow, the `latest` script automatically:

1. Reads `rides.json` to find the most recent ride's timestamp
2. Fetches any newer activities from the Strava API
3. Converts units (meters → miles, m/s → mph) and appends them to `rides.json`
4. Commits and pushes the updated `rides.json` to `main`

To inspect raw Strava data without importing it, use:

```sh
./new-to-old.sh
```

## Deployment

The site is deployed automatically to GitHub Pages on every push to `main` via the workflow in `.github/workflows/static.yml`. No build step is required — the repository contents are served directly as static files.
