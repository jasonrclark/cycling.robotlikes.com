# cycling.robotlikes.com

A personal cycling stats site that pulls ride data from [Strava](https://www.strava.com/) and displays interactive charts. Deployed to GitHub Pages at [cycling.robotlikes.com](https://cycling.robotlikes.com).

## What it shows

- **Ride Distance** – bar chart of distance (miles) per ride
- **Total Distance** – cumulative mileage over time
- **Average Speed** – scatter chart of average mph per ride
- Stats: max/average distance, total hours, total days, ride count, max speed

## How it works

Ride data lives in `rides.json`. The static `index.html` fetches that file and renders charts with [Chart.js](https://www.chartjs.org/). GitHub Actions deploys the whole repo to GitHub Pages on every push to `main`.

## Updating rides

Rides are pulled from Strava using the [strava-ruby-client](https://github.com/dblock/strava-ruby-client) gem. You'll need a Strava API app with `activity:read` scope.

### Prerequisites

```sh
bundle install
```

Create `tmp/env.sh` with your Strava credentials:

```sh
export STRAVA_CLIENT_ID=your_client_id
export STRAVA_CLIENT_SECRET=your_client_secret
```

### Fetch new rides

Run the OAuth flow to get a fresh access token and pull any rides newer than the latest one in `rides.json`:

```sh
./do-it
```

This starts a local WEBrick server, prints a Strava authorization URL, and on successful auth runs `latest` to append new rides to `rides.json`, then commits and pushes to `main`.

Alternatively, run `latest` directly if you already have an access token:

```sh
bundle exec ./latest <access_token>
```

### Preview locally

```sh
ruby -rwebrick -e 'WEBrick::HTTPServer.new(:Port => 8000, :DocumentRoot => Dir.pwd).start'
```

Then open [http://localhost:8000](http://localhost:8000).

## Deployment

Pushing to `main` triggers the GitHub Actions workflow (`.github/workflows/static.yml`), which deploys the repo to GitHub Pages automatically.
