# cycling.robotlikes.com

A personal cycling and walking statistics visualization website powered by [Strava](https://www.strava.com/).

## Overview

This site displays charts and stats for cycling rides and walking activities fetched from the Strava API. It uses [Chart.js](https://www.chartjs.org/) to render interactive graphs showing per-ride distance, cumulative distance, and average speed over time.

- **Cycling page** (`index.html`) — ride distance, total distance, and average speed charts
- **Walking page** (`walking.html`) — equivalent stats for walking activities

## Prerequisites

- Ruby (with Bundler)
- A [Strava API application](https://www.strava.com/settings/api) (Client ID and Client Secret)

## Setup

1. Install dependencies:

   ```bash
   bundle install
   ```

2. Create `tmp/env.sh` with your Strava credentials:

   ```bash
   mkdir -p tmp
   cat > tmp/env.sh <<'EOF'
   export STRAVA_CLIENT_ID=your_client_id
   export STRAVA_CLIENT_SECRET=your_client_secret
   EOF
   ```

## Local Development

Run the local development server:

```bash
./do-it
```

This sources `tmp/env.sh` and starts a WEBrick server on port 9090. It also prints a Strava OAuth URL — open that URL in your browser to authorize the app and fetch the latest activities.

If you're using **GitHub Codespaces**, the server automatically uses the forwarded port URL for the OAuth redirect.

## Updating Activity Data

After authorizing via the OAuth flow, the server calls the `latest` script to fetch new activities from Strava since the most recent entry in `rides.json`, converts them to the local format, and commits the updated `rides.json` to the repository.

You can also manually inspect raw Strava activity data with:

```bash
./new-to-old.sh
```

## Project Structure

| File/Directory | Description |
|---|---|
| `index.html` | Cycling statistics page |
| `walking.html` | Walking statistics page |
| `code.js` | Shared charting and display logic |
| `rides.json` | Stored cycling activity data |
| `walks.json` | Stored walking activity data |
| `serve.rb` | Local development server and OAuth handler |
| `latest` | Script to fetch new activities from Strava |
| `do-it` | Convenience script to start the local server |
| `new-to-old.sh` | Helper to view raw Strava JSON in the old format |
| `tmp/env.sh` | Local environment variables (not committed) |
