# Robot Likes Cycling

This repository contains the static site for [cycling.robotlikes.com](https://cycling.robotlikes.com).
It charts cycling and walking activity data from local JSON files using Chart.js.

## Files

- `index.html` renders cycling charts from `rides.json`.
- `walking.html` renders walking charts from `walks.json`.
- `code.js` contains shared chart and display helpers.
- `rides.json` and `walks.json` contain the activity data used by the site.
- `latest` fetches newer Strava cycling activities and appends them to `rides.json`.
- `serve.rb` runs a local WEBrick server and handles the Strava OAuth callback used by `latest`.
- `do-it` loads `tmp/env.sh` and starts `serve.rb`.

## Local setup

Install Ruby dependencies:

```sh
bundle install
```

Serve the site locally:

```sh
ruby -run -e httpd . -p 8000
```

Then open <http://localhost:8000>.

## Updating ride data from Strava

Create an environment file with Strava credentials:

```sh
mkdir -p tmp
cat > tmp/env.sh <<'EOF'
export STRAVA_CLIENT_ID=your-client-id
export STRAVA_CLIENT_SECRET=your-client-secret
EOF
```

Start the OAuth helper through `do-it`:

```sh
./do-it
```

Open the printed Strava authorization URL. After authorization, the callback fetches new activities,
uses `latest` to update `rides.json`, commits the change, and pushes it to `main`.

## Data format

`rides.json` entries include:

- `strava_id`
- `ride_date`
- `duration`
- `average_speed`
- `max_speed`
- `created_at`
- `where_to`
- `distance`

`walks.json` entries include walking dates and distances used by `walking.html`.
