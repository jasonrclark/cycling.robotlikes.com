# cycling.robotlikes.com

A personal cycling and walking statistics visualization website powered by [Strava](https://www.strava.com/) data. Charts are rendered with [Chart.js](https://www.chartjs.org/) and the site is hosted on GitHub Pages.

## What it does

- **Cycling page** (`index.html`): displays per-ride distance, cumulative distance over time, and average speed charts along with summary stats (max, average, total distance, total hours/days).
- **Walking page** (`walking.html`): displays per-walk and cumulative walk distance charts with summary stats.
- Data is stored locally as JSON (`rides.json`, `walks.json`) and fetched by the browser at runtime.

## File structure

```
.
├── index.html        # Cycling stats page
├── walking.html      # Walking stats page
├── code.js           # Shared Chart.js helpers used by both pages
├── rides.json        # Processed cycling activity data
├── walks.json        # Processed walking activity data
├── raw-rides.json    # Raw Strava API response (unprocessed)
├── new-rides.json    # Staging file for newly fetched rides
├── latest            # Ruby script: fetches new rides from Strava and appends to rides.json
├── new-to-old.sh     # Helper script for migrating old raw data format
├── serve.rb          # WEBrick dev server + Strava OAuth callback handler
├── do-it             # Convenience script to start the local dev server
├── Gemfile           # Ruby dependencies
└── CNAME             # GitHub Pages custom domain (cycling.robotlikes.com)
```

## Strava API setup

1. Create a Strava API application at <https://www.strava.com/settings/api>.
2. Create `tmp/env.sh` (this file is **not** committed) and add your credentials:

   ```sh
   export STRAVA_CLIENT_ID=your_client_id
   export STRAVA_CLIENT_SECRET=your_client_secret
   ```

## Local development

Install Ruby dependencies:

```sh
bundle install
```

Start the local dev server (sources `tmp/env.sh` automatically):

```sh
./do-it
```

The server starts on port 9090. Open your browser to the Strava authorization URL printed in the terminal. After authorizing, Strava redirects to the `/auth` callback which fetches the latest activities and updates `rides.json`.

## Updating ride data

After authorizing via the local server (see above), `rides.json` is updated automatically and the changes are committed and pushed to `main`.

To fetch new rides manually once you have an access token:

```sh
bundle exec ./latest <access_token>
```

## Deployment

The site is deployed via **GitHub Pages** from the `main` branch root. The custom domain `cycling.robotlikes.com` is configured in `CNAME`.
