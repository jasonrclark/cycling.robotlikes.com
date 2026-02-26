# cycling.robotlikes.com

A personal cycling and walking statistics visualization website powered by [Strava](https://www.strava.com/) data.

## Overview

This site displays charts and summary stats for cycling rides and walking activities, fetched from the Strava API. It is hosted as a static GitHub Pages site with a small Ruby server used locally to refresh data from Strava.

- **Cycling page** (`index.html`): per-ride distance, cumulative distance, and average speed over time
- **Walking page** (`walking.html`): per-walk distance and cumulative distance over time

## Setup

### Prerequisites

- Ruby (with Bundler)
- A [Strava API application](https://www.strava.com/settings/api)

### Install dependencies

```bash
bundle install
```

### Configure Strava credentials

Create a `tmp/env.sh` file (ignored by git) with your Strava API credentials:

```bash
export STRAVA_CLIENT_ID=your_client_id
export STRAVA_CLIENT_SECRET=your_client_secret
```

## Local Development

Run the local server to refresh ride data from Strava:

```bash
./do-it
```

This sources `tmp/env.sh` and starts a WEBrick server on port 9090. It will print a Strava OAuth authorization URL in the terminal. Open that URL in your browser to authenticate, which will:

1. Fetch new activities from Strava since the last recorded ride
2. Append them to `rides.json`
3. Commit and push the updated data to `main`

The site itself is static HTML/JS and can be viewed directly in a browser by opening `index.html` or `walking.html`, or served via the local WEBrick server at `http://localhost:9090`.

## Updating Data

The `latest` script fetches new Strava activities using an access token and appends them to `rides.json`. It is invoked automatically during the OAuth callback in `serve.rb`.

To manually convert raw Strava API output, use `new-to-old.sh` which uses `jq` to reshape `new-rides.json` into the expected format.

## File Structure

```
index.html        # Cycling statistics page
walking.html      # Walking statistics page
code.js           # Shared Chart.js chart and vanity metric helpers
rides.json        # Processed cycling activity data
walks.json        # Processed walking activity data
serve.rb          # Local Ruby server for Strava OAuth and data refresh
do-it             # Convenience script to start the local server
latest            # Ruby script to fetch and append new Strava activities
new-rides.json    # Raw Strava API output (staging area)
raw-rides.json    # Historical raw ride data
new-to-old.sh     # jq script to reshape raw Strava data
Gemfile           # Ruby dependencies
tmp/env.sh        # Local Strava credentials (not committed)
```
