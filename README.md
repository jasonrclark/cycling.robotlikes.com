# cycling.robotlikes.com

A static site that visualizes cycling activity data pulled from [Strava](https://www.strava.com/). Charts show per-ride distance, cumulative distance over time, and average speed. Deployed to GitHub Pages.

## File structure

```
├── index.html          # Main cycling stats page
├── walking.html        # Walking stats page
├── code.js             # Chart.js rendering logic
├── rides.json          # Stored cycling ride data
├── walks.json          # Stored walking activity data
├── raw-rides.json      # Raw Strava API response (scratch data)
├── new-rides.json      # Staging file for new ride data
├── latest              # Ruby script: fetches new rides from Strava and appends to rides.json
├── new-to-old.sh       # Helper: pretty-prints raw Strava fields via jq
├── serve.rb            # Local dev server: handles Strava OAuth and triggers data refresh
├── do-it               # Convenience script to start local dev server
├── Gemfile             # Ruby dependencies
└── .github/workflows/
    └── static.yml      # GitHub Pages deployment workflow
```

## Strava API setup

1. Create a Strava API application at <https://www.strava.com/settings/api>.
2. Note your **Client ID** and **Client Secret**.
3. Create `tmp/env.sh` (gitignored) with your credentials:

```sh
export STRAVA_CLIENT_ID=your_client_id
export STRAVA_CLIENT_SECRET=your_client_secret
```

## Local development

Install Ruby dependencies:

```sh
bundle install
```

Start the local server:

```sh
./do-it
```

This sources `tmp/env.sh` and starts a WEBrick server on port 9090. It also prints a Strava OAuth URL—open that URL in your browser to authorize and trigger a data fetch.

## Updating ride data

After OAuth authorization completes, `serve.rb` automatically runs the `latest` script, which:

1. Reads `rides.json` to find the most recent ride date.
2. Queries the Strava API for activities since that date.
3. Converts units (meters → miles, m/s → mph) and appends new rides to `rides.json`.
4. Commits and pushes the updated `rides.json` to `main`.

## Deployment

Pushes to `main` trigger the GitHub Actions workflow (`.github/workflows/static.yml`), which deploys the entire repository as a static site to GitHub Pages at <https://cycling.robotlikes.com>.
