# cycling.robotlikes.com

A personal cycling and walking statistics visualization website powered by [Strava](https://www.strava.com/) data. Live at [cycling.robotlikes.com](https://cycling.robotlikes.com).

## What It Does

- **Cycling page** (`index.html`): Charts ride distance per outing, cumulative total distance, and average speed over time.
- **Walking page** (`walking.html`): Charts walk distance per outing and cumulative total distance over time.

Charts are built with [Chart.js](https://www.chartjs.org/) and support click-drag zooming on the time axis.

## Project Structure

```
index.html        # Cycling stats page
walking.html      # Walking stats page
code.js           # Shared chart/vanity rendering helpers
rides.json        # Cycling activity data
walks.json        # Walking activity data
serve.rb          # Local dev server; handles Strava OAuth callback and data updates
latest            # Script to fetch new rides from Strava and append to rides.json
do-it             # Convenience script to start the local server
Gemfile           # Ruby dependencies
new-to-old.sh     # One-off helper to inspect raw Strava JSON fields
```

## Setup

### Prerequisites

- Ruby (with Bundler)
- A [Strava API application](https://www.strava.com/settings/api)

### Install dependencies

```bash
bundle install
```

### Configure credentials

Create a `tmp/env.sh` file (excluded from git) with your Strava app credentials:

```bash
export STRAVA_CLIENT_ID=your_client_id
export STRAVA_CLIENT_SECRET=your_client_secret
```

## Local Development

Run the local server (sources `tmp/env.sh` and starts WEBrick on port 9090):

```bash
./do-it
```

The script will print a Strava OAuth authorization URL. Visit that URL in your browser, authorize the app, and you'll be redirected back to the local server at `/auth`. The server will:

1. Exchange the OAuth code for an access token.
2. Fetch new activities from Strava since the last recorded ride.
3. Append new rides to `rides.json`.
4. Commit and push the updated `rides.json` to `main`.

### GitHub Codespaces

`serve.rb` automatically detects a Codespaces environment and constructs the correct public callback URL using `CODESPACE_NAME` and `GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN`.

## Updating Data Manually

To fetch rides directly (useful for debugging), run `latest` with an access token:

```bash
bundle exec ./latest <access_token>
```

This reads `rides.json`, determines the timestamp of the most recent ride, queries the Strava API for activities after that point, converts units (meters → miles, m/s → mph), and writes the updated data back to `rides.json`.
