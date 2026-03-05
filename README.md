# cycling.robotlikes.com

A static website that visualizes cycling and walking activity data pulled from Strava. Deployed at [cycling.robotlikes.com](https://cycling.robotlikes.com).

## Pages

- **Cycling** (`index.html`) — Charts for ride distance, total distance over time, and average speed
- **Walking** (`walking.html`) — Charts for walk distance and total distance over time

Both pages use [Chart.js](https://www.chartjs.org/) with zoom support via `chartjs-plugin-zoom`.

## File Structure

```
├── index.html        # Cycling stats page
├── walking.html      # Walking stats page
├── code.js           # Shared chart/display logic
├── rides.json        # Cycling activity data
├── walks.json        # Walking activity data
├── raw-rides.json    # Raw Strava API response data
├── new-rides.json    # Staging file for new ride imports
├── new-to-old.sh     # Helper to inspect raw ride data with jq
├── latest            # Ruby script to fetch new rides from Strava
├── serve.rb          # Local dev server with Strava OAuth flow
├── do-it             # Script to start the local dev server
├── Gemfile           # Ruby dependencies
└── CNAME             # Custom domain config for GitHub Pages
```

## Strava API Setup

1. Create a Strava API application at [strava.com/settings/api](https://www.strava.com/settings/api)
2. Create a `tmp/` directory (gitignored) and add `tmp/env.sh`:

```sh
export STRAVA_CLIENT_ID=your_client_id
export STRAVA_CLIENT_SECRET=your_client_secret
```

## Local Development

Install dependencies:

```sh
bundle install
```

Start the local server:

```sh
./do-it
```

This sources `tmp/env.sh` and starts a WEBrick server on port 9090. The server also initiates the Strava OAuth flow — follow the printed URL to authorize and fetch the latest rides. New ride data will be fetched, merged into `rides.json`, committed, and pushed automatically.

## Updating Ride Data

The `latest` script fetches new rides since the most recent entry in `rides.json`:

```sh
bundle exec ./latest <strava_access_token>
```

To inspect raw Strava data in `new-rides.json`:

```sh
./new-to-old.sh
```

## Deployment

The site is deployed to GitHub Pages automatically on every push to `main` via the workflow in `.github/workflows/static.yml`. The entire repository contents are served as the static site.
