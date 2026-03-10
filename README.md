# cycling.robotlikes.com

A static website that visualizes cycling activity data fetched from [Strava](https://www.strava.com/). Charts are rendered with [Chart.js](https://www.chartjs.org/) and the site is hosted on GitHub Pages at [cycling.robotlikes.com](https://cycling.robotlikes.com).

## Features

- Per-ride distance bar chart
- Cumulative total distance over time
- Average speed scatter plot
- Vanity stats: max distance, average distance, ride count, total hours/days, max speed

## File Structure

```
.
├── index.html          # Main cycling stats page
├── walking.html        # Walking stats page
├── code.js             # Chart rendering logic
├── rides.json          # Stored cycling ride data
├── walks.json          # Stored walking activity data
├── new-rides.json      # Scratch file for raw Strava API output
├── latest              # Ruby script to fetch new rides from Strava and append to rides.json
├── new-to-old.sh       # jq helper to inspect raw Strava JSON fields
├── serve.rb            # Local development server with Strava OAuth callback
├── do-it               # Shell script to start the local server
├── Gemfile             # Ruby dependencies
└── CNAME               # GitHub Pages custom domain
```

## Strava API Setup

1. Create a Strava API application at <https://www.strava.com/settings/api>.
2. Set the **Authorization Callback Domain** to `localhost` (or your Codespace domain when using GitHub Codespaces).
3. Create `tmp/env.sh` (this file is git-ignored) with your credentials:

```sh
export STRAVA_CLIENT_ID=your_client_id
export STRAVA_CLIENT_SECRET=your_client_secret
```

## Local Development

Install Ruby dependencies:

```sh
bundle install
```

Start the local server:

```sh
./do-it
```

This sources `tmp/env.sh`, starts a WEBrick server on port 9090, and prints a Strava OAuth authorization URL. Open that URL in your browser to authenticate. After authorizing, Strava redirects back to the local `/auth` endpoint, which fetches new rides, updates `rides.json`, and commits and pushes the changes.

## Updating Ride Data Manually

If you already have a Strava access token you can run the `latest` script directly:

```sh
bundle exec ./latest <access_token>
```

This appends any rides newer than the most recent entry in `rides.json` and writes the updated file.

## Deployment

The site is deployed automatically to GitHub Pages on every push to `main` via the workflow in `.github/workflows/static.yml`. The entire repository is uploaded as the Pages artifact, so `rides.json` (and all other static files) are served directly.
