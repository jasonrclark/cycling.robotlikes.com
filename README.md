# cycling.robotlikes.com

`cycling.robotlikes.com` is a small static website that visualizes personal cycling activity, with a companion walking page, using locally stored JSON data and browser-rendered charts.

## Features

- Displays ride distance, cumulative distance, and average speed charts
- Shows summary metrics such as max distance, average distance, ride count, total hours, and total days
- Includes a companion walking dashboard at `walking.html`
- Uses local JSON files (`rides.json` and `walks.json`) as the site's data source
- Includes Ruby scripts for refreshing ride data from Strava
- Deploys the repository as a static site with GitHub Pages

## Technology Stack

- **HTML** for the site pages
- **JavaScript** for chart rendering and summary calculations
- **Ruby** for local tooling and Strava data refresh scripts
- **Shell** for small helper commands
- **Chart.js** plus time-series and zoom plugins loaded from CDNs
- **GitHub Pages** for hosting

## Installation / Setup

### Prerequisites

- Ruby 3.x
- Bundler

### Clone and install dependencies

```bash
git clone https://github.com/jasonrclark/cycling.robotlikes.com.git
cd cycling.robotlikes.com
bundle install
```

### Run locally

The site is static, so the simplest local preview is:

```bash
ruby -rwebrick -e 'WEBrick::HTTPServer.new(:Port => 8000, :DocumentRoot => Dir.pwd).start'
```

Then open:

- `http://localhost:8000/index.html`
- `http://localhost:8000/walking.html`

There is also a convenience script in the repository root:

```bash
./site
```

## Usage

### View the dashboards

- `index.html` shows cycling activity charts based on `rides.json`
- `walking.html` shows walking distance charts based on `walks.json`

Both pages load their data in the browser and render charts directly from the JSON files in this repository.

### Refresh ride data from Strava

The repository includes Ruby helpers for updating `rides.json` from Strava:

- `latest` fetches activities newer than the most recent ride already stored locally
- `serve.rb` starts a local OAuth callback server and triggers the update flow
- `do-it` sources `tmp/env.sh` and runs `serve.rb`

Environment variables used by the Strava tooling:

- `STRAVA_CLIENT_ID`
- `STRAVA_CLIENT_SECRET`

Example:

```bash
bundle exec ruby serve.rb
```

## Project Structure

```text
.
├── index.html              # Cycling dashboard
├── walking.html            # Walking dashboard
├── code.js                 # Shared chart and summary helpers
├── rides.json              # Cycling activity data
├── walks.json              # Walking activity data
├── latest                  # Strava-based ride refresh script
├── serve.rb                # Local OAuth/update helper server
├── do-it                   # Small wrapper for running serve.rb with local env
├── site                    # Simple static preview command
└── .github/workflows/
    └── static.yml          # GitHub Pages deployment workflow
```

## Contributing

Contributions are welcome. A small, focused workflow for changes is:

1. Fork the repository
2. Create a feature branch
3. Preview the site locally and verify your changes
4. Open a pull request with a clear description

If you change the data-refresh workflow, document any required environment variables or setup changes in the PR.

## License

This repository does not currently include a `LICENSE` file.
