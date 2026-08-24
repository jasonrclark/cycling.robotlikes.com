# Robot Likes Cycling

A static GitHub Pages dashboard for visualizing cycling and walking activity
history.

The published site reads `rides.json` and `walks.json` directly in the browser
and renders charts with Chart.js.

## Local setup

Install the Ruby dependencies:

```sh
bundle install
```

To refresh cycling data from Strava, create `tmp/env.sh` with
`STRAVA_CLIENT_ID` and `STRAVA_CLIENT_SECRET`, then start the local OAuth
callback server:

```sh
./do-it
```

Open the authorization URL printed by the server. After authorization, the
callback fetches activities newer than the latest entry in `rides.json` and
commits the updated data.

## Data

- `rides.json` contains the cycling data displayed by `index.html`.
- `walks.json` contains the walking data displayed by `walking.html`.
- `latest` fetches and normalizes new cycling activities from Strava.

The site is deployed to GitHub Pages by `.github/workflows/static.yml` whenever
changes are pushed to `main`.
