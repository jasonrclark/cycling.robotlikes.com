# cycling.robotlikes.com

A static site that visualizes cycling (and walking) activity data pulled from [Strava](https://www.strava.com/). Charts show per-ride distance, cumulative distance, and average speed over time.

## Install

Requires Ruby and [Bundler](https://bundler.io/).

```sh
bundle install
```

## Run

1. Create `tmp/env.sh` with your Strava API credentials:

```sh
export STRAVA_CLIENT_ID=your_client_id
export STRAVA_CLIENT_SECRET=your_client_secret
```

2. Start the local server:

```sh
./do-it
```

This starts a WEBrick server on port 9090 and prints a Strava OAuth URL. Visit that URL to authorize, which triggers a fetch of new rides, updates `rides.json`, and commits + pushes the changes.

## Update ride data manually

```sh
./latest <access_token>
```

## File structure

```
index.html       # Cycling stats page
walking.html     # Walking stats page
rides.json       # Stored ride data
walks.json       # Stored walk data
code.js          # Shared charting helpers
latest           # Script to fetch new rides from Strava and append to rides.json
serve.rb         # Local dev server + Strava OAuth flow
do-it            # Convenience wrapper to source env and start serve.rb
new-to-old.sh    # Helper to inspect new-rides.json fields
```

## Deploy

The site is deployed to GitHub Pages automatically on every push to `main` via the included GitHub Actions workflow.
