# cycling.robotlikes.com

A personal cycling and walking statistics visualization website, powered by [Strava](https://www.strava.com/) data and hosted on GitHub Pages.

Live site: [cycling.robotlikes.com](https://cycling.robotlikes.com)

## What it does

- **Cycling page** (`index.html`) — charts ride distance per outing, cumulative total distance, and average speed over time, along with vanity stats (max distance, average, total miles, total hours/days on the bike).
- **Walking page** (`walking.html`) — charts walk distance per outing and cumulative total distance (in km), along with max, average, and total distance stats.

Charts are built with [Chart.js](https://www.chartjs.org/) and support drag-to-zoom via the chartjs-plugin-zoom plugin.

## Project structure

```
.
├── index.html        # Cycling stats page
├── walking.html      # Walking stats page
├── code.js           # Shared chart/vanity-stat helper functions
├── rides.json        # Stored cycling activity data
├── walks.json        # Stored walking activity data
├── serve.rb          # Local dev server + Strava OAuth callback handler
├── do-it             # Convenience script to start the local server
├── latest            # Ruby script: fetch latest rides from Strava and append to rides.json
├── new-to-old.sh     # Helper to inspect raw Strava activity JSON
├── Gemfile           # Ruby dependencies
└── CNAME             # GitHub Pages custom domain
```

## Strava API setup

The site pulls activity data from Strava using OAuth. You need a Strava API application:

1. Create an app at [https://www.strava.com/settings/api](https://www.strava.com/settings/api).
2. Set the **Authorization Callback Domain** to `localhost` for local use (or your Codespace domain if running in GitHub Codespaces).
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

This sources `tmp/env.sh` and starts a WEBrick server on port 9090. The script will print a Strava authorization URL — open it in your browser. After you authorize, Strava redirects to the local `/auth` endpoint which:

1. Exchanges the OAuth code for an access token.
2. Runs the `latest` script to fetch new rides and append them to `rides.json`.
3. Commits and pushes the updated `rides.json` to `main`.

The site files are served directly from the repo root, so you can view the pages at `http://localhost:9090/index.html`.

### GitHub Codespaces

When running in a Codespace the server automatically uses the forwarded port URL for the OAuth callback instead of `localhost`.

## Updating ride data

To manually fetch the latest rides without going through the full OAuth flow:

```sh
bundle exec ./latest <access_token>
```

This reads `rides.json`, finds the most recent ride, and fetches any new activities from Strava that started after that point.

## Deployment

The site is deployed as a static GitHub Pages site. Pushing changes to `main` automatically updates the live site. The `CNAME` file sets the custom domain to `cycling.robotlikes.com`.

Data updates (new rides) are committed directly to `rides.json` on `main` by the `serve.rb` OAuth callback handler.
