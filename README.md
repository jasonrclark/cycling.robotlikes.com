# cycling.robotlikes.com

A personal activity tracking site that pulls cycling and walking data from Strava and displays it as interactive charts. Hosted on GitHub Pages.

## Overview

The site visualizes ride and walk data (distance, speed, duration) as time-series charts using Chart.js. Data is fetched from the Strava API, stored as JSON, and committed to the repo to be served statically.

## File Structure

```
.
├── index.html          # Cycling stats page
├── walking.html        # Walking stats page
├── code.js             # Shared chart and display logic
├── rides.json          # Stored cycling activity data
├── walks.json          # Stored walking activity data
├── latest              # Ruby script to fetch new Strava activities
├── serve.rb            # Local dev server + Strava OAuth handler
├── do-it               # Script to start the local dev server
├── new-to-old.sh       # Helper script for data migration
├── Gemfile             # Ruby dependencies
└── .github/workflows/
    └── static.yml      # GitHub Pages deployment workflow
```

## Strava API Setup

1. Create a Strava API application at https://www.strava.com/settings/api
2. Set the **Authorization Callback Domain** to `localhost`
3. Create `tmp/env.sh` (this file is gitignored) with your credentials:

```sh
export STRAVA_CLIENT_ID=your_client_id
export STRAVA_CLIENT_SECRET=your_client_secret
```

## Local Development

Install dependencies:

```sh
bundle install
```

Start the local server (sources `tmp/env.sh` and runs `serve.rb`):

```sh
./do-it
```

The server starts on port 9090 and prints a Strava OAuth authorization URL to the console. Visit that URL in a browser to authenticate. After authorizing, Strava redirects to `/auth`, which fetches new activities and updates `rides.json`.

## Updating Activity Data

The `latest` script fetches new rides from Strava since the most recent entry in `rides.json` and appends them. It is called automatically by `serve.rb` during the OAuth flow, or can be run manually:

```sh
bundle exec ./latest <strava_access_token>
```

Distances are converted from meters to miles (cycling) or kilometers (walking), and speeds from m/s to mph.

## Deployment

The site is deployed automatically to GitHub Pages on every push to `main` via the workflow in `.github/workflows/static.yml`. The entire repository is uploaded as the Pages artifact, so `rides.json`, `walks.json`, and all HTML/JS files are served directly.
