# cycling.robotlikes.com

A small static site that charts my cycling (and walking) history, published with
GitHub Pages at [cycling.robotlikes.com](https://cycling.robotlikes.com).

## How it works

The site is plain HTML and JavaScript, rendering charts with
[Chart.js](https://www.chartjs.org/) directly from JSON files checked into this
repository.

| File | Purpose |
| --- | --- |
| `index.html` | Cycling charts (distance, totals, speeds) |
| `walking.html` | Walking charts |
| `code.js` | Shared chart and stat helpers |
| `rides.json` | Ride data rendered by `index.html` |
| `walks.json` | Walk data rendered by `walking.html` |
| `raw-rides.json`, `new-rides.json` | Intermediate Strava exports kept for reference |

Rides are recorded in miles, walks in kilometers.

## Running locally

Serve the repository root over HTTP so the pages can `fetch` the JSON files:

```
./site
```

That starts a WEBrick server on <http://localhost:8000>.

## Updating rides from Strava

Ride data comes from Strava. Fetching it requires a Strava API application and
these environment variables (for example, in `tmp/env.sh`, which is git-ignored):

```
export STRAVA_CLIENT_ID=...
export STRAVA_CLIENT_SECRET=...
```

Install the Ruby dependencies once:

```
bundle install
```

Then run:

```
./do-it
```

This sources `tmp/env.sh` and starts `serve.rb`, which prints a Strava
authorization URL. Visiting it redirects back to the local `/auth` endpoint,
which runs `./latest` to append any activities newer than the most recent entry
in `rides.json`, then commits and pushes the update.

Walks are added to `walks.json` by hand.

## Deployment

Pushing to `main` triggers the `Deploy static content to Pages` workflow in
`.github/workflows/static.yml`, which uploads the whole repository to GitHub
Pages. The custom domain is set by `CNAME`.

## Helper scripts

- `latest` – appends new Strava activities to `rides.json`
- `new-to-old.sh` – `jq` filter that maps raw Strava JSON into this site's shape
