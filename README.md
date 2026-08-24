# cycling.robotlikes.com

A tiny static site that charts my cycling (and walking) history, hosted on GitHub
Pages at [cycling.robotlikes.com](https://cycling.robotlikes.com).

Ride data comes from [Strava](https://www.strava.com) and is stored as plain JSON
in this repo. The pages are static HTML that fetch that JSON and render it with
[Chart.js](https://www.chartjs.org).

## Layout

| Path | What it is |
| --- | --- |
| `index.html` | Cycling charts (distance, speed, totals) |
| `walking.html` | Walking charts |
| `code.js` | Shared charting and formatting helpers |
| `rides.json` | Ride history (miles), pulled from Strava |
| `walks.json` | Walk history (kilometers), entered by hand |
| `serve.rb` | Local server that runs the Strava OAuth flow and updates rides |
| `latest` | Fetches rides newer than the latest one in `rides.json` |
| `site` | One-liner to serve the repo statically on port 8000 |
| `do-it` | Loads `tmp/env.sh`, then runs `serve.rb` |
| `new-to-old.sh` | `jq` helper for reshaping raw Strava output |
| `CNAME` | Custom domain for GitHub Pages |

## Viewing the site locally

```sh
./site
```

Then open <http://localhost:8000>.

## Updating rides from Strava

1. `bundle install`
2. Put your Strava API credentials in `tmp/env.sh`:

   ```sh
   export STRAVA_CLIENT_ID=...
   export STRAVA_CLIENT_SECRET=...
   ```

3. Run `./do-it`. It prints an authorization URL — open it, approve access, and
   the callback will run `./latest`, append any new activities to `rides.json`,
   and commit and push the update.

## Updating walks

Walks aren't in Strava, so add an entry by hand to `walks.json`:

```json
{
  "walk_date": "2026-08-11",
  "distance": 7.27
}
```

Distances in `walks.json` are kilometers; distances in `rides.json` are miles.
