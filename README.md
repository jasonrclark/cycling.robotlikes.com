# cycling.robotlikes.com

A personal activity tracking site that pulls cycling and walking data from [Strava](https://www.strava.com/) and displays it as interactive charts. Hosted on GitHub Pages at [cycling.robotlikes.com](https://cycling.robotlikes.com).

## Features

- **Cycling page** (`index.html`): Charts for ride distance per ride, cumulative distance over time, and average speed.
- **Walking page** (`walking.html`): Similar charts for walking activities.
- Vanity stats: max, average, total distance; total hours/days; max/average speed.
- Zoomable, interactive charts powered by [Chart.js](https://www.chartjs.org/).

## How It Works

1. **OAuth** — `./do-it` starts a local Ruby server (`serve.rb`) and prints a Strava authorization URL. Visiting that URL in your browser sends you through Strava's OAuth flow.
2. **Fetch** — After you authorize, Strava redirects back to the local server with a short-lived access token. `serve.rb` hands it to the `latest` script, which calls the Strava API for activities newer than the last entry in `rides.json`.
3. **Store** — `latest` converts the raw Strava data (metric units, epoch times) into the app's format and appends the results to `rides.json` (or `walks.json`). The server then commits and pushes the updated JSON to `main`.
4. **Render** — The static HTML pages (`index.html`, `walking.html`) fetch the JSON at load time and use `code.js` + Chart.js to render the charts entirely in the browser—no backend needed at runtime.

## File Structure

```
.
├── index.html        # Cycling stats page
├── walking.html      # Walking stats page
├── code.js           # Shared charting / display logic
├── rides.json        # Stored cycling activity data
├── walks.json        # Stored walking activity data
├── latest            # Ruby script: fetches new rides from Strava and appends to rides.json
├── serve.rb          # Local dev server: handles Strava OAuth flow and triggers data update
├── do-it             # Shell script: sources credentials and starts serve.rb
├── new-to-old.sh     # Helper to inspect raw Strava API response format
├── Gemfile           # Ruby dependencies
└── CNAME             # GitHub Pages custom domain
```

## Strava API Setup

1. Create a [Strava API application](https://www.strava.com/settings/api).
2. Create `tmp/env.sh` (this file is gitignored) with your credentials:

```sh
export STRAVA_CLIENT_ID=your_client_id
export STRAVA_CLIENT_SECRET=your_client_secret
```

3. Set the **Authorization Callback Domain** in your Strava app settings to `localhost` (or your Codespace domain when running in GitHub Codespaces).

## Local Development

Install dependencies:

```sh
bundle install
```

Run the local server:

```sh
./do-it
```

This sources `tmp/env.sh` and starts a WEBrick server on port 9090. The script will print a Strava OAuth authorization URL. Visit that URL in your browser to authorize the app. After authorization, Strava will redirect back to the local server, which will fetch the latest activities and update `rides.json`, then commit and push the changes.

## Updating Activity Data

The `latest` script fetches new activities from Strava since the most recent ride in `rides.json` and appends them. It is called automatically by `serve.rb` during the OAuth flow, but can also be run manually with a valid Strava access token:

```sh
bundle exec ./latest <access_token>
```

## Deployment

The site is served as a static site via **GitHub Pages**. Push changes to the `main` branch and GitHub Pages will automatically serve the updated files. The `CNAME` file points the site to `cycling.robotlikes.com`.
