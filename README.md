# cycling.robotlikes.com

A static GitHub Pages site that visualizes cycling (and walking) activity stats pulled from Strava.

Live at: [cycling.robotlikes.com](https://cycling.robotlikes.com)

## What it does

- **[index.html](index.html)** – Charts per-ride distance, cumulative distance, and average speed for bike rides.
- **[walking.html](walking.html)** – Charts per-walk distance and cumulative distance for walks.

Data is stored in [`rides.json`](rides.json) and [`walks.json`](walks.json) and rendered client-side with [Chart.js](https://www.chartjs.org/).

## Updating rides

Rides are fetched from the Strava API using a local OAuth flow:

1. Copy `tmp/env.sh.example` (if it exists) or create `tmp/env.sh` with your Strava credentials:
   ```sh
   export STRAVA_CLIENT_ID=...
   export STRAVA_CLIENT_SECRET=...
   ```
2. Run the update script:
   ```sh
   ./do-it
   ```
   This starts a local server, opens the Strava OAuth flow, fetches new activities since the last recorded ride, and appends them to `rides.json`.

3. Commit and push `rides.json` (and `walks.json` if updated) to `main`. GitHub Actions will deploy the updated site automatically.

## Deployment

Pushes to `main` trigger the [GitHub Actions workflow](.github/workflows/static.yml), which deploys the entire repository as a GitHub Pages site.

## Local preview

```sh
ruby -rwebrick -e 'WEBrick::HTTPServer.new(:Port => 8000, :DocumentRoot => Dir.pwd).start'
```

Then open [http://localhost:8000](http://localhost:8000).

## Dependencies

Ruby gems (see [`Gemfile`](Gemfile)):
- `strava-ruby-client` – Strava API client
- `strava-ruby-cli` – CLI wrapper for Strava API calls
- `webrick` – local HTTP server for OAuth callback
- `dotenv`, `pry` – dev utilities
