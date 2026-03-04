# cycling.robotlikes.com

A personal cycling and walking statistics visualization website, powered by [Strava](https://www.strava.com/) data and hosted on GitHub Pages.

## Overview

The site displays interactive charts for cycling rides (`index.html`) and walking activities (`walking.html`) using [Chart.js](https://www.chartjs.org/). Activity data is fetched from the Strava API and stored locally as JSON files (`rides.json`, `walks.json`).

## File Structure

```
.
├── index.html        # Cycling stats page
├── walking.html      # Walking stats page
├── code.js           # Shared chart/display logic
├── rides.json        # Stored cycling activity data
├── walks.json        # Stored walking activity data
├── latest            # Ruby script to fetch new rides from Strava
├── serve.rb          # Local dev server with Strava OAuth flow
├── do-it             # Shell script to start the local dev server
├── Gemfile           # Ruby dependencies
└── new-to-old.sh     # Helper script for data migration
```

## Strava API Setup

1. Create a [Strava API application](https://www.strava.com/settings/api) and note your **Client ID** and **Client Secret**.

2. Create a `tmp/env.sh` file (excluded from version control) with your credentials:

   ```sh
   export STRAVA_CLIENT_ID=your_client_id
   export STRAVA_CLIENT_SECRET=your_client_secret
   ```

## Local Development

Install Ruby dependencies:

```sh
bundle install
```

Start the local server (sources credentials from `tmp/env.sh` and starts a WEBrick server on port 9090):

```sh
./do-it
```

The script will print a Strava OAuth authorization URL. Open it in your browser to authenticate. After authorizing, Strava redirects to `/auth`, which fetches new activities, updates `rides.json`, and commits/pushes the changes automatically.

## Updating Activity Data

To fetch the latest rides manually with an access token:

```sh
bundle exec ./latest <access_token>
```

This reads the most recent entry in `rides.json`, fetches any newer Strava activities, converts units (meters → miles, m/s → mph), and appends them to `rides.json`.

## Deployment

The site is served via [GitHub Pages](https://pages.github.com/) from the `main` branch. The `CNAME` file configures the custom domain `cycling.robotlikes.com`.
