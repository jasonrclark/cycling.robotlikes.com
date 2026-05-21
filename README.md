# Robot Likes Cycling

A personal cycling (and walking) statistics site hosted at [cycling.robotlikes.com](https://cycling.robotlikes.com). It pulls activity data from [Strava](https://www.strava.com) and visualizes it with interactive charts.

## Overview

The site displays ride and walk data with time-series charts powered by [Chart.js](https://www.chartjs.org/):

- **Per-ride distance** (bar chart)
- **Cumulative total distance** over time
- **Average speed** per ride

Summary stats (max distance, average distance, total miles, total hours, etc.) are shown alongside the charts.

A companion [walking page](walking.html) tracks the same stats for walking activities.

Data is stored locally in `rides.json` and `walks.json` and updated by fetching fresh activities from the Strava API via the scripts in this repo.

## Getting Started

### Prerequisites

- Ruby (see `Gemfile` for gem dependencies)
- [Bundler](https://bundler.io/)
- A [Strava API application](https://developers.strava.com/docs/getting-started/) with a client ID and secret

### Installation

```bash
bundle install
```

### Configuration

Create a `tmp/env.sh` file (excluded from version control) with your Strava credentials:

```bash
export STRAVA_CLIENT_ID=your_client_id
export STRAVA_CLIENT_SECRET=your_client_secret
```

### Fetching ride data

Run the OAuth flow to authenticate with Strava and pull the latest activities into `rides.json`:

```bash
./do-it
```

This starts a local web server on port 9090, prints a Strava authorization URL, and — once you authorize — fetches your rides and commits the updated `rides.json`.

> **GitHub Codespaces**: the script automatically uses the forwarded Codespaces URL as the OAuth redirect URI.

### Previewing the site locally

```bash
ruby -rwebrick -e 'WEBrick::HTTPServer.new(:Port => 8000, :DocumentRoot => Dir.pwd).start'
```

Then open <http://localhost:8000> in your browser.

## Contributing

This is a personal project, but suggestions and bug reports are welcome — feel free to open an issue or pull request.
