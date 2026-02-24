# cycling.robotlikes.com

A personal cycling and walking statistics visualization website powered by [Strava](https://www.strava.com/) data.

## Overview

Two pages display interactive charts of activity history:

- **[index.html](index.html)** – Cycling stats: per-ride distance, cumulative distance over time, and average speed (imperial units)
- **[walking.html](walking.html)** – Walking stats: per-walk distance and cumulative distance over time (metric units)

Charts are built with [Chart.js](https://www.chartjs.org/) and support drag-to-zoom on the time axis.

## Setup

### Prerequisites

- Ruby (with [Bundler](https://bundler.io/))
- A [Strava API application](https://www.strava.com/settings/api) (for fetching ride data)

### Install dependencies

```bash
bundle install
```

### Configure Strava credentials

Create `tmp/env.sh` with your Strava API credentials:

```bash
export STRAVA_CLIENT_ID=your_client_id
export STRAVA_CLIENT_SECRET=your_client_secret
```

## Updating ride data

Run the local server to trigger a Strava OAuth flow and fetch new activities:

```bash
./do-it
```

This sources `tmp/env.sh` and starts a WEBrick server on port 9090. It prints a Strava authorization URL — open it in a browser to authenticate. After authorization, the server:

1. Exchanges the OAuth code for an access token
2. Calls `./latest` to fetch new rides from Strava and append them to `rides.json`
3. Commits and pushes the updated `rides.json` to the `main` branch

> **GitHub Codespaces**: The server automatically detects the `CODESPACE_NAME` environment variable and uses the appropriate forwarded URL for the OAuth redirect.

## File structure

| File | Description |
|------|-------------|
| `index.html` | Cycling stats page |
| `walking.html` | Walking stats page |
| `code.js` | Shared Chart.js helpers for rendering charts and vanity stats |
| `rides.json` | Cycling activity data (distance in miles, speed in mph) |
| `walks.json` | Walking activity data (distance in km) |
| `serve.rb` | WEBrick server handling Strava OAuth and data refresh |
| `latest` | Ruby script that fetches new rides via the Strava CLI and appends them to `rides.json` |
| `do-it` | Shell script that loads credentials and starts `serve.rb` |
| `new-to-old.sh` | Utility to inspect raw Strava JSON with `jq` |
| `Gemfile` | Ruby gem dependencies |
