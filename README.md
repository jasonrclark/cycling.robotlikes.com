# cycling.robotlikes.com

A personal cycling and walking statistics visualization website powered by [Strava](https://www.strava.com/) activity data, hosted on GitHub Pages.

## Overview

This site displays charts and stats for cycling rides (`index.html`) and walks (`walking.html`), pulling data from `rides.json` and `walks.json` respectively. Charts are rendered with [Chart.js](https://www.chartjs.org/) and include per-activity distance, cumulative distance over time, and average speed.

## File Structure

```
.
├── index.html        # Cycling stats page
├── walking.html      # Walking stats page
├── code.js           # Shared charting/vanity logic
├── rides.json        # Stored cycling activity data
├── walks.json        # Stored walking activity data
├── latest            # Ruby script to fetch new rides from Strava
├── new-to-old.sh     # Helper to inspect raw Strava JSON
├── new-rides.json    # Temporary file for raw Strava API output
├── serve.rb          # Local dev server with Strava OAuth flow
├── do-it             # Convenience script to start the local server
├── Gemfile           # Ruby dependencies
└── CNAME             # Custom domain for GitHub Pages
```

## Strava API Setup

1. Create a [Strava API application](https://www.strava.com/settings/api).
2. Create `tmp/env.sh` (ignored by git) and add your credentials:

   ```sh
   export STRAVA_CLIENT_ID=your_client_id
   export STRAVA_CLIENT_SECRET=your_client_secret
   ```

## Local Development

Install Ruby dependencies:

```sh
bundle install
```

Start the local server (sources credentials and launches `serve.rb`):

```sh
./do-it
```

The server runs on port 9090. It prints a Strava OAuth URL to the terminal — visit that URL and authorize the app. The OAuth callback will automatically fetch new activity data, update `rides.json`, and push the changes to `main`.

## Updating Activity Data

To fetch new rides manually with an existing Strava access token:

```sh
bundle exec ./latest <access_token>
```

This appends any new activities since the last recorded ride to `rides.json`.

## Deployment

The site is deployed via [GitHub Pages](https://pages.github.com/) using the `main` branch. The custom domain is configured in the `CNAME` file.
