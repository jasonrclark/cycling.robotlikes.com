# cycling.robotlikes.com

A personal cycling and walking statistics visualization website, hosted at [cycling.robotlikes.com](https://cycling.robotlikes.com). Activity data is pulled from Strava and displayed as interactive charts using Chart.js.

## Overview

- **Cycling page** (`index.html`): Shows per-ride distance, cumulative distance over time, and average speed charts.
- **Walking page** (`walking.html`): Shows per-walk distance and cumulative distance over time charts.

## File Structure

```
├── index.html          # Cycling statistics page
├── walking.html        # Walking statistics page
├── code.js             # Shared charting and display logic
├── rides.json          # Stored cycling activity data
├── walks.json          # Stored walking activity data
├── serve.rb            # Local dev server with Strava OAuth flow
├── do-it               # Script to start the local dev server
├── latest              # Script to fetch new rides from Strava API
├── new-to-old.sh       # Utility to inspect raw Strava activity JSON
├── new-rides.json      # Staging file for newly fetched activities
├── raw-rides.json      # Raw Strava API response data
├── Gemfile             # Ruby dependencies
├── CNAME               # Custom domain for GitHub Pages
└── .github/workflows/
    └── static.yml      # GitHub Actions workflow for GitHub Pages deployment
```

## Strava API Setup

1. Create a Strava API application at [strava.com/settings/api](https://www.strava.com/settings/api).
2. Create a `tmp/env.sh` file (excluded from version control) with your credentials:

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

This sources `tmp/env.sh` and starts a WEBrick server on port 9090. It also initiates the Strava OAuth flow—open the printed authorization URL in a browser to authenticate. After authorizing, Strava redirects to the local `/auth` endpoint, which fetches new activities, updates `rides.json`, and commits and pushes the changes.

If running in a GitHub Codespace, the redirect URL is automatically set to the forwarded Codespace port.

## Updating Activity Data

To fetch new rides after authenticating:

```sh
bundle exec ./latest <access_token>
```

This compares the most recent ride in `rides.json` and fetches any newer activities from Strava, appending them to `rides.json`.

## Deployment

The site is deployed automatically to GitHub Pages via the workflow in `.github/workflows/static.yml`. Any push to the `main` branch triggers a deployment of the entire repository as a static site to [cycling.robotlikes.com](https://cycling.robotlikes.com).
