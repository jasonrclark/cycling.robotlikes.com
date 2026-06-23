# cycling.robotlikes.com

A static site that visualizes cycling (and walking) stats pulled from Strava.

Live at: [cycling.robotlikes.com](https://cycling.robotlikes.com)

## What it does

Displays interactive Chart.js charts for:
- Per-ride distance (bar chart)
- Cumulative total distance over time
- Average speed per ride

Ride data is stored in `rides.json` and walking data in `walks.json`.

## Updating ride data

Fetching new rides from Strava requires OAuth. The `serve.rb` script handles this flow locally or in a GitHub Codespace.

### Prerequisites

Copy the environment template and fill in your Strava API credentials:

```
cp tmp/env.sh.example tmp/env.sh
# Edit tmp/env.sh with your STRAVA_CLIENT_ID and STRAVA_CLIENT_SECRET
```

### Run the update server

```
./do-it
```

This sources `tmp/env.sh` and starts a local server on port 9090. Open the printed Strava authorization URL in your browser. After authorizing, the server will:
1. Fetch new activities from Strava via the `latest` script
2. Append them to `rides.json`
3. Commit and push the updated file to `main`

### Manual data inspection

To inspect a raw Strava activities export, use `new-to-old.sh` to reformat `new-rides.json`:

```
bash new-to-old.sh
```

## Local preview

```
ruby -rwebrick -e 'WEBrick::HTTPServer.new(:Port => 8000, :DocumentRoot => Dir.pwd).start'
```

Then open [http://localhost:8000](http://localhost:8000).

## Deployment

GitHub Actions automatically deploys to GitHub Pages on every push to `main` via `.github/workflows/static.yml`.
