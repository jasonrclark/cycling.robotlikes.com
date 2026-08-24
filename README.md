# Robot Likes Cycling

Static charts for cycling and walking activity data published at
<https://cycling.robotlikes.com>.

## What is here

- `index.html` renders cycling charts from `rides.json`.
- `walking.html` renders walking charts from `walks.json`.
- `code.js` contains the shared Chart.js helpers.
- `latest` fetches new Strava rides and appends them to `rides.json`.
- `serve.rb` starts a local WEBrick server for the Strava OAuth callback used by
  the ride update workflow.

## Local preview

Serve the repository root with any local HTTP server so the browser can fetch the
JSON data files:

```sh
ruby -run -e httpd . -p 8000
```

Then open <http://localhost:8000>.

## Updating ride data

Install the Ruby dependencies:

```sh
bundle install
```

Create `tmp/env.sh` with Strava OAuth credentials:

```sh
export STRAVA_CLIENT_ID="..."
export STRAVA_CLIENT_SECRET="..."
```

Then run:

```sh
./do-it
```

The script starts the OAuth callback server, prints a Strava authorization URL,
and updates `rides.json` after authorization completes. Review the generated diff
before committing the data update.

## Data files

- `rides.json` is the normalized cycling data used by the site.
- `walks.json` is the normalized walking data used by the site.
- `raw-rides.json` and `new-rides.json` are source/intermediate data files kept
  for reference.
