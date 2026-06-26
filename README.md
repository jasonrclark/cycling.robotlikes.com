# cycling.robotlikes.com

A static site that visualizes cycling (and walking) stats pulled from Strava.

Live at: https://cycling.robotlikes.com

## What it does

Displays interactive Chart.js charts for:
- Per-ride distance
- Cumulative total distance over time
- Average speed per ride

Ride data is stored in `rides.json` and walks in `walks.json`.

## Local preview

Serve the static files directly:

```
ruby -rwebrick -e 'WEBrick::HTTPServer.new(:Port => 8000, :DocumentRoot => Dir.pwd).start'
```

Then open http://localhost:8000.

## Updating ride data

Ride data is fetched from Strava via OAuth. You'll need a `tmp/env.sh` exporting `STRAVA_CLIENT_ID` and `STRAVA_CLIENT_SECRET`.

```
source tmp/env.sh
bundle exec ruby serve.rb
```

Visit the printed Strava OAuth URL, authorize the app, and the server will fetch new rides, update `rides.json`, commit, and push automatically.

## Deployment

Pushes to `main` automatically deploy to GitHub Pages via `.github/workflows/static.yml`.
