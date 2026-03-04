# cycling.robotlikes.com

A personal cycling and walking statistics visualization website, powered by [Strava](https://www.strava.com/). Hosted on GitHub Pages at [cycling.robotlikes.com](https://cycling.robotlikes.com).

## Overview

The site displays interactive charts for cycling rides (`index.html`) and walks (`walking.html`), showing per-activity distance, cumulative distance over time, and average speed. Data is pulled from Strava via OAuth and stored as JSON files in the repo.

## File Structure

| File / Directory | Description |
|---|---|
| `index.html` | Cycling stats page |
| `walking.html` | Walking stats page |
| `code.js` | Shared charting and display logic |
| `rides.json` | Processed cycling activity data |
| `walks.json` | Processed walking activity data |
| `raw-rides.json` | Raw Strava API response data |
| `new-rides.json` | Staging file for newly fetched Strava activities |
| `serve.rb` | Local WEBrick server + Strava OAuth callback handler |
| `do-it` | Convenience script to start the local server |
| `latest` | Ruby script to fetch new activities from Strava and update `rides.json` |
| `new-to-old.sh` | Shell script using `jq` to inspect raw Strava data |
| `Gemfile` | Ruby dependencies |
| `CNAME` | GitHub Pages custom domain config |

## Strava API Setup

1. Create a Strava API application at [https://www.strava.com/settings/api](https://www.strava.com/settings/api).
2. Set the **Authorization Callback Domain** to `localhost` (or your Codespace domain).
3. Create `tmp/env.sh` with your credentials:

```sh
export STRAVA_CLIENT_ID=your_client_id
export STRAVA_CLIENT_SECRET=your_client_secret
```

> `tmp/` is gitignored so secrets are never committed.

## Local Development

Install Ruby dependencies:

```sh
bundle install
```

Start the local server:

```sh
./do-it
```

This sources `tmp/env.sh` and starts a WEBrick server on port 9090. The script will print a Strava OAuth authorization URL. Open that URL in your browser to authorize the app. After authorizing, Strava redirects to `/auth`, which:

1. Exchanges the OAuth code for an access token
2. Runs the `latest` script to fetch new activities and append them to `rides.json`
3. Commits and pushes the updated `rides.json` to `main`

## Deployment

The site is deployed automatically via GitHub Pages. The `CNAME` file points the custom domain `cycling.robotlikes.com` to the GitHub Pages host. Any push to `main` updates the live site.
