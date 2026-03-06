# cycling.robotlikes.com

A static website that visualizes cycling (and walking) activity data pulled from [Strava](https://www.strava.com/), hosted on GitHub Pages at [cycling.robotlikes.com](https://cycling.robotlikes.com).

## What it does

- Displays charts of ride distance, speed, and cumulative totals over time using [Chart.js](https://www.chartjs.org/)
- Fetches activity data from the Strava API and stores it locally as JSON
- Serves a separate walking stats page at `/walking.html`

## File structure

```
index.html        # Cycling stats page
walking.html      # Walking stats page
code.js           # Chart rendering logic
rides.json        # Stored cycling activity data
walks.json        # Stored walking activity data
serve.rb          # Local dev server + Strava OAuth handler
latest            # Ruby script: fetches new rides from Strava and appends to rides.json
new-to-old.sh     # Converts raw Strava JSON (new-rides.json) to the rides.json format
new-rides.json    # Temporary raw data from Strava (not committed)
Gemfile           # Ruby dependencies
do-it             # Convenience script to start the local dev server
CNAME             # GitHub Pages custom domain config
```

## Strava API setup

1. Create a Strava API application at [strava.com/settings/api](https://www.strava.com/settings/api).
2. Create `tmp/env.sh` (ignored by git) with your credentials:

```sh
export STRAVA_CLIENT_ID=your_client_id
export STRAVA_CLIENT_SECRET=your_client_secret
```

## Local development

Install dependencies:

```sh
bundle install
```

Start the local server (sources `tmp/env.sh` and runs `serve.rb` on port 9090):

```sh
./do-it
```

The server prints a Strava OAuth authorization URL. Open it in a browser to authorize and trigger a ride data fetch.

## Updating ride data

After authorizing via the local server, the `/auth` callback will:

1. Exchange the OAuth code for an access token
2. Run `./latest` to fetch new rides since the last recorded ride and append them to `rides.json`
3. Commit and push the updated `rides.json` to `main`

To manually convert raw Strava JSON (saved as `new-rides.json`) to the `rides.json` format, run:

```sh
./new-to-old.sh
```

## Deployment

The site is deployed automatically via GitHub Pages from the `main` branch. The custom domain is configured in the `CNAME` file.
