# cycling.robotlikes.com

A personal cycling stats site that pulls ride data from [Strava](https://www.strava.com) and displays it as interactive charts.

Live at: [cycling.robotlikes.com](https://cycling.robotlikes.com)

## Overview

The site visualizes cycling activity data (distance, speed, duration, etc.) using [Chart.js](https://www.chartjs.org/). Ride data is stored as JSON and updated by authenticating with the Strava API.

## Setup

1. Install dependencies:
   ```bash
   bundle install
   ```

2. Create `tmp/env.sh` with your Strava API credentials:
   ```bash
   export STRAVA_CLIENT_ID=your_client_id
   export STRAVA_CLIENT_SECRET=your_client_secret
   ```

3. Register your Strava app with the redirect URL pointing to `http://localhost:9090/auth` (or your Codespace URL).

## Updating Ride Data

Run the server to kick off the Strava OAuth flow and fetch the latest rides:

```bash
./do-it
```

This starts a local server on port 9090, prints an authorization URL, and — once you complete the OAuth flow — fetches new rides, updates `rides.json`, and pushes the commit.

## Local Preview

Serve the site locally:

```bash
ruby -rwebrick -e 'WEBrick::HTTPServer.new(:Port => 8000, :DocumentRoot => Dir.pwd).start'
```

Then open [http://localhost:8000](http://localhost:8000).

## Files

| File | Purpose |
|---|---|
| `index.html` | Main cycling stats page |
| `walking.html` | Walking stats page |
| `code.js` | Chart rendering logic |
| `rides.json` | Cached ride data |
| `walks.json` | Cached walk data |
| `serve.rb` | Local server + Strava OAuth handler |
| `latest` | Script to fetch latest rides from Strava |
| `new-to-old.sh` | Converts new-format ride JSON to the stored format |
