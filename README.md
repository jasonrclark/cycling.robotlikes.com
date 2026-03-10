# cycling.robotlikes.com

A static website that visualizes cycling (and walking) activity data pulled from [Strava](https://www.strava.com/), hosted on GitHub Pages at [cycling.robotlikes.com](https://cycling.robotlikes.com).

## What It Does

- Displays interactive charts of ride distance, total distance over time, and average speed using [Chart.js](https://www.chartjs.org/)
- Shows summary stats: max distance, average distance, total miles, total hours/days, max and average speed
- Also tracks walking activity at [`/walking.html`](https://cycling.robotlikes.com/walking.html)
- Data is stored as JSON in the repo and updated manually via the Strava API

## File Structure

```
index.html        # Main cycling stats page
walking.html      # Walking stats page
code.js           # Frontend JS for charts and stats
rides.json        # Cycling activity data
walks.json        # Walking activity data
serve.rb          # Local dev server + Strava OAuth handler
do-it             # Script to start local dev server
latest            # Ruby script to fetch new rides from Strava
new-to-old.sh     # Helper to inspect raw Strava API output
Gemfile           # Ruby dependencies
CNAME             # Custom domain for GitHub Pages
.github/
  workflows/
    static.yml    # GitHub Actions workflow to deploy to GitHub Pages
```

## Strava API Setup

1. Create a Strava API application at [https://www.strava.com/settings/api](https://www.strava.com/settings/api).
2. Set the **Authorization Callback Domain** to `localhost`.
3. Create `tmp/env.sh` (this directory is gitignored) with your credentials:

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

This sources `tmp/env.sh` and starts a WEBrick server on port 9090. The script will print a Strava authorization URL — open it in your browser to complete OAuth and trigger a data update.

To view the site without updating data, run:

```sh
ruby -rwebrick -e'WEBrick::HTTPServer.new(:Port => 8000, :DocumentRoot => Dir.pwd).start'
```

(This is also saved in the `site` file for reference.)

## Updating Ride Data

After completing OAuth via `./do-it`, the `latest` script runs automatically and appends any new Strava activities to `rides.json`. It then commits and pushes the update to `main`.

To inspect raw Strava API output manually, pipe `new-rides.json` through `new-to-old.sh`:

```sh
bash new-to-old.sh
```

## Deployment

The site is deployed automatically to GitHub Pages on every push to `main` via the workflow in `.github/workflows/static.yml`. The entire repository is uploaded as the Pages artifact.
