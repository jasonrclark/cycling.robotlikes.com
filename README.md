# Robot Likes Cycling

Static charts for cycling and walking activity data, published at <https://cycling.robotlikes.com>.

## What is here

- `index.html` renders cycling charts from `rides.json`.
- `walking.html` renders walking charts from `walks.json`.
- `code.js` contains shared Chart.js helpers.
- `latest` fetches new Strava ride activity and appends it to `rides.json`.
- `serve.rb` runs a local OAuth callback server for authorizing Strava access.
- `.github/workflows/static.yml` deploys the repository contents to GitHub Pages.

## Local setup

Install the Ruby dependencies:

```sh
bundle install
```

Serve the static site from the repository root with any local static file server, for example:

```sh
ruby -run -e httpd . -p 8000
```

Then open <http://localhost:8000>.

## Updating ride data

Ride updates use the Strava API and require `STRAVA_CLIENT_ID` and `STRAVA_CLIENT_SECRET`.
The `do-it` script expects those values in `tmp/env.sh`, starts `serve.rb`, and prints a Strava authorization URL.
After authorization, `serve.rb` runs `latest`, updates `rides.json`, and commits the result.

Walking data is maintained in `walks.json`.

## Deployment

Pushes to `main` deploy the static site to GitHub Pages using the `Deploy static content to Pages` workflow.
