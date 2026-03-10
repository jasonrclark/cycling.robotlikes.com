# cycling.robotlikes.com

A static site that visualizes cycling (and walking) activity data pulled from Strava. Charts are built with [Chart.js](https://www.chartjs.org/) and the site is hosted on GitHub Pages.

## Features

- Per-ride distance bar chart
- Cumulative distance over time
- Average speed scatter plot
- Vanity stats (max distance, average distance, total hours/days, etc.)
- Walking activity page (`walking.html`)

## File Structure

```
.
├── index.html        # Cycling stats page
├── walking.html      # Walking stats page
├── code.js           # Shared chart/vanity helpers
├── rides.json        # Stored cycling ride data
├── walks.json        # Stored walking activity data
├── latest            # Ruby script to fetch new rides from Strava
├── serve.rb          # Local dev server + Strava OAuth handler
├── do-it             # Shell script to start the local server
├── new-to-old.sh     # jq helper to inspect raw Strava API output
├── new-rides.json    # Scratch file for raw Strava API responses
├── raw-rides.json    # Additional raw data scratch file
├── Gemfile           # Ruby dependencies
└── .github/
    └── workflows/
        └── static.yml  # GitHub Pages deployment workflow
```

## Prerequisites

- Ruby (with Bundler)
- A [Strava API application](https://www.strava.com/settings/api) (for fetching new rides)

Install Ruby dependencies:

```bash
bundle install
```

## Strava API Setup

1. Create an app at <https://www.strava.com/settings/api>.
2. Create `tmp/env.sh` (this file is git-ignored) and add your credentials:

```bash
export STRAVA_CLIENT_ID=your_client_id
export STRAVA_CLIENT_SECRET=your_client_secret
```

## Local Development

Run the local server with:

```bash
./do-it
```

This sources `tmp/env.sh` and starts a WEBrick server on port 9090. It also prints a Strava OAuth authorization URL. Open that URL in a browser to authenticate with Strava and trigger a data fetch.

> In GitHub Codespaces the redirect URL is automatically adjusted to use the forwarded port domain.

## Updating Ride Data

After OAuth completes, `serve.rb` calls the `latest` script, which:

1. Reads the most recent ride date from `rides.json`.
2. Fetches all Strava activities recorded after that date.
3. Converts units (m/s → mph, meters → miles) and appends the new rides to `rides.json`.
4. Commits and pushes the updated `rides.json` to `main`.

You can also inspect raw Strava JSON manually using the `new-to-old.sh` jq helper.

## Deployment

The site deploys automatically to GitHub Pages on every push to `main` via the workflow in `.github/workflows/static.yml`. The entire repository root is uploaded as the Pages artifact.
