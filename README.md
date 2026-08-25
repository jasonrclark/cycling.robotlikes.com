# Robot Likes Cycling

Static charts for cycling and walking activity data, published at
`cycling.robotlikes.com`.

## What's here

- `index.html` renders cycling charts from `rides.json`.
- `walking.html` renders walking charts from `walks.json`.
- `code.js` contains the shared charting and summary-stat logic.
- `latest` fetches new Strava cycling activities and appends them to
  `rides.json`.
- `serve.rb` starts a local WEBrick server and handles the Strava OAuth callback
  used by `latest`.

## Setup

Install the Ruby dependencies:

```sh
bundle install
```

Create `tmp/env.sh` with the Strava OAuth credentials used by `serve.rb`:

```sh
export STRAVA_CLIENT_ID=your-client-id
export STRAVA_CLIENT_SECRET=your-client-secret
```

## Run locally

Start the site on port 9090:

```sh
bundle exec ruby serve.rb
```

Or use the helper script, which sources `tmp/env.sh` first:

```sh
./do-it
```

Open the URL printed by `serve.rb`, authorize Strava, and the callback will
fetch new rides into `rides.json`.

## Data files

The site reads committed JSON files directly in the browser:

- `rides.json` for cycling data
- `walks.json` for walking data

After updating data, review the diff before committing.
