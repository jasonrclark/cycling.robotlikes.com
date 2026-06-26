# cycling.robotlikes.com

A static site that visualizes cycling (and walking) data pulled from [Strava](https://www.strava.com/). Charts are rendered with [Chart.js](https://www.chartjs.org/) and the site is deployed to GitHub Pages.

Live at: [cycling.robotlikes.com](https://cycling.robotlikes.com)

## Structure

| File / Directory | Purpose |
|---|---|
| `index.html` | Cycling stats page (distance, speed, totals) |
| `walking.html` | Walking stats page |
| `rides.json` | Ride data consumed by `index.html` |
| `walks.json` | Walk data consumed by `walking.html` |
| `code.js` | Shared chart/vanity-stat helpers |
| `latest` | Script that fetches new rides from Strava and appends them to `rides.json` |
| `serve.rb` | OAuth helper that kicks off the Strava auth flow and triggers `latest` |
| `do-it` | Convenience wrapper that loads env vars and runs `serve.rb` |
| `new-to-old.sh` | Utility for migrating ride data formats |

## Updating ride data

Ride data is fetched from Strava via OAuth. You'll need a Strava API application and the following environment variables set (e.g. in `tmp/env.sh`):

```sh
export STRAVA_CLIENT_ID=<your client id>
export STRAVA_CLIENT_SECRET=<your client secret>
```

Then run:

```sh
bundle install
./do-it
```

`serve.rb` starts a local OAuth server, prints an authorization URL, and waits for the callback. After you authorize in the browser, it calls `latest` to pull new rides, updates `rides.json`, and commits and pushes to `main`.

When running in a GitHub Codespace the callback URL is automatically set to the forwarded port URL.

## Local preview

Serve the static files locally with Ruby's built-in WEBrick:

```sh
ruby -rwebrick -e 'WEBrick::HTTPServer.new(:Port => 8000, :DocumentRoot => Dir.pwd).start'
```

Then open [http://localhost:8000](http://localhost:8000).

## Deployment

Pushes to `main` automatically deploy the site to GitHub Pages via the workflow in `.github/workflows/static.yml`.
