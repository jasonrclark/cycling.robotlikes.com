# Robot Likes Cycling

Source for [cycling.robotlikes.com](https://cycling.robotlikes.com), a static
site that charts my Strava rides (and walks) over time.

## How it works

- `rides.json` / `walks.json` hold the historical activity data used by the
  site.
- `index.html` and `walking.html` render charts of that data using
  [Chart.js](https://www.chartjs.org/), loaded via CDN.
- `code.js` contains the client-side logic that builds the charts.
- `latest` is a Ruby script that fetches new activities from the Strava API
  (via `strava-ruby-client`) and appends them to `rides.json`.
- `serve.rb` runs a local WEBrick server and handles the Strava OAuth flow: it
  visits `/auth`, exchanges the returned code for an access token, runs
  `latest` to pull new rides, and commits/pushes the updated `rides.json`.

## Requirements

- Ruby
- [Bundler](https://bundler.io/)
- A Strava API application (`STRAVA_CLIENT_ID` and `STRAVA_CLIENT_SECRET`
  environment variables)

## Setup

```sh
bundle install
```

## Running locally

Start the server, which also kicks off the Strava authorization flow:

```sh
bundle exec ruby serve.rb
```

This serves the site on port 9090 and prints an authorization URL. Visiting
it (and completing the Strava OAuth flow) triggers `/auth`, which pulls in
new rides and commits them to `rides.json`.

To just serve the static site without the Strava integration:

```sh
ruby site
```

This serves the site on port 8000.
