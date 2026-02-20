# cycling.robotlikes.com

A personal cycling and walking statistics visualization website powered by [Strava](https://www.strava.com/).

## Overview

This site displays charts for cycling rides (`index.html`) and walking activities (`walking.html`), including per-activity distance, cumulative totals, and speed metrics.

## Setup

### Prerequisites

- Ruby (with Bundler)
- A [Strava API application](https://www.strava.com/settings/api) (for fetching activity data)

### Install dependencies

```bash
bundle install
```

### Configure Strava credentials

Create a `tmp/env.sh` file (the `tmp/` directory is gitignored) with your Strava API credentials:

```bash
export STRAVA_CLIENT_ID=your_client_id
export STRAVA_CLIENT_SECRET=your_client_secret
```

## Usage

### Run the local development server

```bash
./do-it
```

This sources `tmp/env.sh` and starts a WEBrick server on port 9090. It also kicks off the Strava OAuth flow and prints the authorization URL to the console.

Visit the printed redirect URL in your browser to authorize the app. After authorizing, the server will fetch the latest activities and update `rides.json`, then commit and push the changes automatically.

### Fetch the latest rides manually

If you have an access token, you can run the `latest` script directly:

```bash
bundle exec ./latest <access_token>
```

This fetches any new activities from Strava since the last recorded ride and appends them to `rides.json`.

## Project structure

| File/Directory | Description |
|---|---|
| `index.html` | Cycling statistics page |
| `walking.html` | Walking statistics page |
| `code.js` | Chart rendering and helper functions |
| `rides.json` | Processed cycling activity data |
| `walks.json` | Processed walking activity data |
| `serve.rb` | Local development server and Strava OAuth handler |
| `do-it` | Script to start the development server |
| `latest` | Script to fetch and append the latest Strava activities |
| `Gemfile` | Ruby dependencies |
| `tmp/` | Gitignored directory for local secrets (`env.sh`) |
