# cycling.robotlikes.com

A personal cycling and walking statistics visualization website powered by [Strava](https://www.strava.com/) API data, deployed via GitHub Pages.

Live site: **[cycling.robotlikes.com](https://cycling.robotlikes.com)**

---

## Overview

Two stat pages display activity history pulled from the Strava API:

- **Cycling** (`index.html`) — Ride Distance (miles), Total Distance (miles), and Average Speed (mph) charts, plus vanity stats: max, average, count, total hours, and total days.
- **Walking** (`walking.html`) — Walk Distance (km) and Total Distance (km) charts, plus vanity stats.

Charts are interactive (zoom/pan) and built with [Chart.js](https://www.chartjs.org/). Activity data is stored as static JSON files and committed to the repository, so the site works as a fully static GitHub Pages deployment with no backend.

---

## Prerequisites

- Ruby (for the local OAuth server and data-fetch scripts)
- [Bundler](https://bundler.io/)
- A [Strava account](https://www.strava.com/) with recorded activities
- A Strava API application (see below)

---

## Strava API Setup

1. Go to [https://www.strava.com/settings/api](https://www.strava.com/settings/api) and create a new application.
2. Set **Authorization Callback Domain** to `localhost`.
3. Note your **Client ID** and **Client Secret** — you'll need them for local development.

---

## Local Development

### 1. Install Ruby dependencies

```bash
bundle install
```

### 2. Configure credentials

Create the file `tmp/env.sh` (this file is not committed):

```bash
mkdir -p tmp
cat > tmp/env.sh <<'EOF'
export STRAVA_CLIENT_ID=your_client_id
export STRAVA_CLIENT_SECRET=your_client_secret
EOF
```

### 3. Fetch new activity data

```bash
./do-it
```

This sources `tmp/env.sh` and starts a local [WEBrick](https://github.com/ruby/webrick) server on port 9090. The terminal will print a Strava OAuth URL — open it in a browser and authorize the application. After authorization, Strava redirects to `localhost:9090`, completing the OAuth flow. The server then:

1. Exchanges the authorization code for an access token.
2. Fetches your latest activities from the Strava API.
3. Updates `rides.json` and/or `walks.json`.
4. Commits and pushes the changes.

### 4. Preview the site locally

After data is fetched you can open `index.html` or `walking.html` directly in a browser, or serve the directory with any static file server, for example:

```bash
python3 -m http.server 8080
```

---

## How Data Is Stored

Activity data lives in two static JSON files at the repository root:

| File | Contents |
|------|----------|
| `rides.json` | Cycling activities fetched from Strava |
| `walks.json` | Walking activities fetched from Strava |

Both files are committed to the repository. Because the site is fully static, there is no runtime API call — the JSON is loaded directly by the browser. Running `./do-it` is the only step needed to pull in new activities and publish them.

The `latest` script can be run independently (after OAuth) to fetch only the most recent activities without going through the full OAuth flow again.

---

## Deployment

The site is deployed via **GitHub Pages** from the `main` branch root. The `CNAME` file sets the custom domain to `cycling.robotlikes.com`.

No build step is required — pushing updated JSON files (done automatically by `./do-it`) is all that is needed to publish new data.

---

## File Structure

```
cycling.robotlikes.com/
├── index.html         # Cycling stats page
├── walking.html       # Walking stats page
├── code.js            # Shared Chart.js chart and display logic
├── rides.json         # Cycling activity data (Strava)
├── walks.json         # Walking activity data (Strava)
├── serve.rb           # Local WEBrick server + Strava OAuth handler
├── do-it              # Wrapper script: sources tmp/env.sh, runs serve.rb
├── latest             # Script to fetch the latest activities after OAuth
├── new-to-old.sh      # Data migration utility
├── Gemfile            # Ruby gem dependencies
├── Gemfile.lock       # Locked gem versions
├── CNAME              # GitHub Pages custom domain (cycling.robotlikes.com)
└── site/              # Static site assets directory
```

### Frontend libraries (loaded from CDN)

| Library | Version | Purpose |
|---------|---------|---------|
| [Chart.js](https://www.chartjs.org/) | 3.9.1 | Chart rendering |
| [moment.js](https://momentjs.com/) | 2.29.4 | Date parsing and formatting *(maintenance mode)* |
| [chartjs-adapter-moment](https://github.com/chartjs/chartjs-adapter-moment) | 1.0.0 | Chart.js time scale adapter |
| [Hammer.js](https://hammerjs.github.io/) | 2.0.8 | Touch gesture support |
| [chartjs-plugin-zoom](https://www.chartjs.org/chartjs-plugin-zoom/) | 1.2.1 | Chart zoom and pan |
| Pixyll CSS | — | Page styling |
