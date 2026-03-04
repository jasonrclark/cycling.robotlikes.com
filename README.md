# cycling.robotlikes.com

A personal cycling and walking statistics visualization website powered by [Strava](https://www.strava.com/) data, displayed using [Chart.js](https://www.chartjs.org/). Hosted on GitHub Pages.

## Features

- **Cycling stats**: Per-ride distance, cumulative distance over time, average speed
- **Walking stats**: Per-walk distance, cumulative distance over time
- Interactive charts with zoom support

## File Structure

```
├── index.html        # Cycling statistics page
├── walking.html      # Walking statistics page
├── code.js           # Shared chart and display logic
├── rides.json        # Cycling activity data
├── walks.json        # Walking activity data
├── latest            # Script to fetch latest rides from Strava
├── serve.rb          # Local development server (handles Strava OAuth)
├── do-it             # Convenience script to start the local server
├── Gemfile           # Ruby dependencies
└── new-to-old.sh     # Migration script for ride data format
```

## Setup

### Prerequisites

- Ruby (with Bundler)
- A [Strava API application](https://www.strava.com/settings/api)

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

## Local Development

Run the local development server:

```bash
./do-it
```

This sources `tmp/env.sh` and starts a WEBrick server on port 9090. The server handles the Strava OAuth flow to fetch new activity data.

When prompted, visit the Strava authorization URL printed to the console. After authorizing, Strava redirects to `/auth`, which fetches new activities and updates `rides.json`, then commits and pushes the changes to `main`.

## Updating Ride Data

To manually fetch new rides after authenticating:

```bash
bundle exec ./latest <access_token>
```

This fetches activities from Strava since your most recent ride and appends them to `rides.json`.

## Deployment

The site is deployed automatically via GitHub Pages from the `main` branch. Any commit to `main` updates the live site at [cycling.robotlikes.com](https://cycling.robotlikes.com).
