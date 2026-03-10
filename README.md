# cycling.robotlikes.com

A Strava-powered cycling activity dashboard deployed at [cycling.robotlikes.com](https://cycling.robotlikes.com). Displays interactive charts of ride distances, cumulative totals, and average speeds pulled directly from Strava. Also tracks walking activities.

## Features

- Per-ride distance chart (with zoom/pan)
- Cumulative total distance over time
- Average speed per ride
- Summary stats: max/average distance, total miles, total hours/days, average/max speed
- Walking activity tracking at `/walking.html`

## File Structure

```
index.html        # Cycling dashboard (Chart.js visualizations)
walking.html      # Walking dashboard
code.js           # Chart initialization and data formatting
rides.json        # Cycling activity data (auto-updated from Strava)
walks.json        # Walking activity data (auto-updated from Strava)
serve.rb          # Local OAuth server for fetching Strava data
do-it             # Script to start the local server
new-to-old.sh     # Utility to merge new rides into the existing dataset
site              # One-liner static file server for local preview
Gemfile           # Ruby dependencies
```

## Strava API Setup

1. Create an app at [strava.com/settings/api](https://www.strava.com/settings/api). Set the **Authorization Callback Domain** to `localhost`.
2. Create `tmp/env.sh` with your credentials:

```sh
export STRAVA_CLIENT_ID=your_client_id
export STRAVA_CLIENT_SECRET=your_client_secret
```

## Updating Ride Data

1. Run the local OAuth server:

```sh
./do-it
```

2. Visit `http://localhost:9090/auth` in your browser. You'll be redirected to Strava to authorize the app.
3. After authorizing, the server fetches your latest rides, updates `rides.json`, and automatically commits and pushes to `main`.

## Local Development

To preview the site locally without fetching new data, run the static file server:

```sh
./site
```

Then open `http://localhost:8000` in your browser.

## Deployment

The site is automatically deployed to GitHub Pages on every push to `main` via the workflow in `.github/workflows/static.yml`.
