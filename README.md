# cycling.robotlikes.com

A personal cycling and walking statistics visualization website powered by data from the [Strava API](https://developers.strava.com/). Deployed to GitHub Pages at [cycling.robotlikes.com](https://cycling.robotlikes.com).

## Overview

The site displays charts and summary stats for cycling rides and walking activities:

- **Cycling** (`index.html`) — per-ride distance, cumulative distance, and average speed
- **Walking** (`walking.html`) — per-walk distance and cumulative distance

Data is stored locally in JSON files and fetched client-side by the browser.

## File Structure

```
├── index.html        # Cycling stats page
├── walking.html      # Walking stats page
├── code.js           # Shared charting/display logic
├── rides.json        # Cycling activity data
├── walks.json        # Walking activity data
├── serve.rb          # Local dev server (WEBrick + Strava OAuth)
├── do-it             # Script to start local dev server
├── latest            # Script to fetch new rides from Strava API
├── new-to-old.sh     # Helper to inspect raw Strava activity JSON
├── new-rides.json    # Scratch file for newly fetched raw rides
├── raw-rides.json    # Raw Strava API response data
├── CNAME             # GitHub Pages custom domain
├── Gemfile           # Ruby dependencies
└── .github/
    └── workflows/
        └── static.yml  # GitHub Pages deployment workflow
```

## Strava API Setup

1. Create a Strava API application at [strava.com/settings/api](https://www.strava.com/settings/api).
2. Set the **Authorization Callback Domain** to `localhost`.
3. Create `tmp/env.sh` (this file is gitignored) with your credentials:

```sh
export STRAVA_CLIENT_ID=your_client_id
export STRAVA_CLIENT_SECRET=your_client_secret
```

## Local Development

1. Install Ruby dependencies:

```sh
bundle install
```

2. Start the local server:

```sh
./do-it
```

This sources `tmp/env.sh` and starts a WEBrick server on port 9090. It will print a Strava authorization URL — open it in your browser to complete the OAuth flow and fetch new ride data.

## Updating Ride Data

Once authenticated via the local server, the `/auth` callback will:

1. Exchange the OAuth code for an access token
2. Run `./latest` to fetch activities newer than the most recent ride in `rides.json`
3. Append new rides to `rides.json`
4. Commit and push the updated data to `main`

## Deployment

The site is automatically deployed to GitHub Pages on every push to `main` via the workflow in `.github/workflows/static.yml`.
