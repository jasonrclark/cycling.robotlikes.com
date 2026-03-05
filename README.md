# cycling.robotlikes.com

A personal activity tracking site that displays cycling and walking stats pulled from [Strava](https://www.strava.com/), hosted via GitHub Pages.

## Overview

This site shows charts and vanity stats (distance, speed, totals) for cycling rides and walking activities, sourced from the Strava API and stored as JSON files in the repo.

- **Cycling page** (`index.html`): ride distance, total distance, and average speed charts
- **Walking page** (`walking.html`): walk distance and total distance charts

## File Structure

```
.
├── index.html        # Cycling stats page
├── walking.html      # Walking stats page
├── code.js           # Shared charting and display logic
├── rides.json        # Stored cycling ride data
├── walks.json        # Stored walking activity data
├── latest            # Ruby script to fetch new rides from Strava
├── serve.rb          # Local dev server with Strava OAuth flow
├── do-it             # Shell script to start the local dev server
├── new-to-old.sh     # Script to migrate new ride format to old format
└── Gemfile           # Ruby dependencies
```

## Strava API Setup

1. Create a Strava API application at https://www.strava.com/settings/api
2. Create a `tmp/env.sh` file (this path is gitignored) with your credentials:

```sh
export STRAVA_CLIENT_ID=your_client_id
export STRAVA_CLIENT_SECRET=your_client_secret
```

## Local Development

Start the local server (sources Strava credentials and runs the OAuth flow):

```sh
./do-it
```

This starts a WEBrick server on port 9090 and prints a Strava OAuth URL. Visit the URL in a browser to authorize, which will trigger a fetch of new activities and update `rides.json`.

If running in a GitHub Codespace, the redirect URL is automatically set to the forwarded Codespace URL.

## Updating Activity Data

The `latest` script fetches new Strava activities since the most recent ride in `rides.json` and appends them:

```sh
bundle exec ./latest <strava_access_token>
```

This is called automatically during the OAuth flow in `serve.rb`.

## Deployment

The site is hosted on GitHub Pages. After updating `rides.json` or `walks.json`, commit and push to `main`:

```sh
git add rides.json
git commit -m "Rides update"
git push origin main
```
