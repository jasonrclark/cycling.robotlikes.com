# cycling.robotlikes.com

A personal activity statistics visualization website for cycling and walking data, powered by the [Strava API](https://developers.strava.com/).

Live site: **https://cycling.robotlikes.com**

## Overview

The site displays interactive charts for:

- **Cycling** (`index.html`) – per-ride distance, cumulative distance, and average speed over time
- **Walking** (`walking.html`) – per-walk distance and cumulative distance over time

Chart data is stored locally in `rides.json` and `walks.json` and rendered in the browser with [Chart.js](https://www.chartjs.org/).

## Project Structure

```
.
├── index.html        # Cycling statistics page
├── walking.html      # Walking statistics page
├── code.js           # Shared chart/vanity helper functions
├── rides.json        # Cached cycling activity data
├── walks.json        # Cached walking activity data
├── serve.rb          # Local dev server (WEBrick + Strava OAuth flow)
├── latest            # Ruby script to fetch new rides from Strava
├── new-to-old.sh     # Helper: pretty-print raw Strava JSON with jq
├── Gemfile           # Ruby dependencies
└── CNAME             # GitHub Pages custom domain
```

## Setup

### Prerequisites

- Ruby (with Bundler)
- A [Strava API application](https://www.strava.com/settings/api) (for fetching new activity data)
- `jq` (optional, for `new-to-old.sh`)

### Install dependencies

```bash
bundle install
```

### Configure Strava credentials

Create a `tmp/env.sh` file (gitignored) with your Strava app credentials:

```bash
export STRAVA_CLIENT_ID=your_client_id
export STRAVA_CLIENT_SECRET=your_client_secret
```

## Local Development

Start the local development server:

```bash
./do-it
```

This sources `tmp/env.sh` and runs `serve.rb` on port **9090**.

Open `http://localhost:9090` in your browser to view the cycling page, or `http://localhost:9090/walking.html` for the walking page.

### Updating Ride Data

When the server starts, it prints a Strava OAuth authorization URL. Visit that URL, authorize the app, and you will be redirected back to `/auth`. The server will:

1. Exchange the OAuth code for an access token
2. Run `./latest` to fetch new activities from Strava since the most recent ride
3. Append new rides to `rides.json`
4. Commit and push the updated `rides.json` to the `main` branch

## Deployment

The site is hosted via **GitHub Pages**. Pushing updated data files (`rides.json`, `walks.json`) to `main` is all that's needed to publish changes.
