# cycling.robotlikes.com

A personal activity statistics visualization website for cycling and walking, powered by [Strava](https://www.strava.com/) data. Deployed as a static site at [cycling.robotlikes.com](https://cycling.robotlikes.com).

## Features

- **Cycling page** (`index.html`): Charts for ride distance per ride, cumulative total distance over time, and average speed. Includes vanity stats (max distance, average distance, total hours/days on the bike).
- **Walking page** (`walking.html`): Charts for walk distance per walk and cumulative total distance over time.
- Interactive zoom on all charts (drag to zoom in, double-click to reset).

## File Structure

```
.
├── index.html        # Cycling statistics page
├── walking.html      # Walking statistics page
├── code.js           # Shared Chart.js helpers for all charts
├── rides.json        # Cycling activity data (fetched from Strava)
├── walks.json        # Walking activity data
├── raw-rides.json    # Raw Strava API response data
├── new-rides.json    # Recently fetched new ride data
├── latest            # Ruby script to fetch new rides from Strava
├── new-to-old.sh     # Helper to inspect new-rides.json with jq
├── serve.rb          # Local dev server: handles Strava OAuth and data refresh
├── do-it             # Convenience script to start the local dev server
├── Gemfile           # Ruby dependencies
└── .github/
    └── workflows/
        └── static.yml  # GitHub Actions workflow to deploy to GitHub Pages
```

## Setup

### Prerequisites

- Ruby (with Bundler)
- A [Strava API application](https://www.strava.com/settings/api)

### Install dependencies

```sh
bundle install
```

### Strava credentials

Create a `tmp/env.sh` file (this directory is git-ignored) with your Strava API credentials:

```sh
export STRAVA_CLIENT_ID=your_client_id
export STRAVA_CLIENT_SECRET=your_client_secret
```

## Local Development

Start the local development server:

```sh
./do-it
```

This sources `tmp/env.sh` and starts a WEBrick server on port 9090. It also initiates the Strava OAuth flow—follow the printed URL in your browser to authorize and trigger a ride data refresh.

After authorization, the server will:
1. Exchange the OAuth code for an access token
2. Fetch new activities from Strava since the last recorded ride
3. Append them to `rides.json`
4. Commit and push the updated data to `main`

## Updating Ride Data Manually

To fetch the latest rides using an existing Strava access token:

```sh
bundle exec ./latest <access_token>
```

This updates `rides.json` in place.

## Deployment

The site is deployed automatically to [GitHub Pages](https://pages.github.com/) via the workflow in `.github/workflows/static.yml`. Any push to `main` triggers a deploy of the entire repository as a static site.
