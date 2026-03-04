# cycling.robotlikes.com

A personal cycling and walking statistics visualization website powered by [Strava](https://www.strava.com/) data, deployed to [cycling.robotlikes.com](https://cycling.robotlikes.com) via GitHub Pages.

## Overview

This site displays charts and stats for cycling rides and walking activities fetched from the Strava API. It uses [Chart.js](https://www.chartjs.org/) for interactive visualizations and stores activity data locally in JSON files.

- **Cycling page** (`index.html`): per-ride distance, cumulative distance, and average speed charts
- **Walking page** (`walking.html`): per-walk distance and cumulative distance charts

## File Structure

```
.
├── index.html          # Cycling statistics page
├── walking.html        # Walking statistics page
├── code.js             # Shared Chart.js helper functions
├── rides.json          # Stored cycling activity data
├── walks.json          # Stored walking activity data
├── do-it               # Entry point script: sources tmp/env.sh and runs serve.rb
├── serve.rb            # Local development server (WEBrick + Strava OAuth)
├── latest              # Script to fetch new rides from Strava and append to rides.json
├── new-to-old.sh       # jq helper to inspect raw Strava activity fields
├── raw-rides.json      # Raw Strava API response (scratch file)
├── new-rides.json      # Scratch file for new rides before processing
├── Gemfile             # Ruby dependencies
├── CNAME               # Custom domain for GitHub Pages
└── .github/workflows/
    └── static.yml      # GitHub Actions workflow to deploy to GitHub Pages
```

## Strava Setup

1. Create a Strava API application at [https://www.strava.com/settings/api](https://www.strava.com/settings/api).
2. Create the file `tmp/env.sh` (excluded from git) with your credentials:

```sh
export STRAVA_CLIENT_ID=your_client_id
export STRAVA_CLIENT_SECRET=your_client_secret
```

## Local Development

Install Ruby dependencies:

```sh
bundle install
```

Start the local server:

```sh
./do-it
```

This sources `tmp/env.sh` and starts a WEBrick server on port 9090. It will print a Strava OAuth authorization URL to the console. Visit that URL in your browser to authorize the app. After authorization, Strava redirects to `/auth`, which fetches new activities, updates `rides.json`, and commits and pushes the changes.

## Updating Ride Data

Once authenticated, the `latest` script fetches activities added since the most recent ride in `rides.json` and appends them:

```sh
bundle exec ./latest <access_token>
```

The local server (`serve.rb`) calls this automatically during the OAuth flow.

## Deployment

The site is deployed automatically to GitHub Pages on every push to `main` via the workflow in `.github/workflows/static.yml`.
