# Robot Likes Cycling

A static dashboard for visualizing cycling and walking activity. It charts
individual and cumulative distances, speeds, durations, and activity counts
from the JSON data in this repository.

The site is available at [cycling.robotlikes.com](https://cycling.robotlikes.com).

## Local development

Install the Ruby dependencies:

```sh
bundle install
```

Start a local web server from the repository root:

```sh
./site
```

Then open <http://localhost:8000>. The cycling dashboard reads `rides.json`,
while <http://localhost:8000/walking.html> reads `walks.json`.

## Updating ride data

Ride data is imported from Strava. Create an ignored `tmp/env.sh` file that
exports `STRAVA_CLIENT_ID` and `STRAVA_CLIENT_SECRET`, then run:

```sh
./do-it
```

Follow the printed Strava authorization URL. After authorization, the callback
updates `rides.json` with activities newer than the latest recorded ride, then
commits and pushes the updated data to `main`.

Do not commit Strava credentials or access tokens.

## Deployment

Pushes to `main` deploy the repository as a static site through GitHub Pages
using `.github/workflows/static.yml`.
