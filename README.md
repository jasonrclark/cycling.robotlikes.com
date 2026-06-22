# cycling.robotlikes.com

Static site and data files for https://cycling.robotlikes.com.

## What is in this repo

- `index.html` + `code.js`: cycling dashboard UI
- `walking.html`: walking dashboard UI
- `rides.json` / `walks.json`: activity datasets used by the dashboards
- `latest`: script to fetch new rides from Strava and append them to `rides.json`
- `serve.rb`: OAuth helper that authenticates with Strava and triggers `latest`
- `do-it`: convenience script that sources credentials from `tmp/env.sh` and runs `serve.rb`

## Local preview

From the repository root:

```bash
ruby -rwebrick -e 'WEBrick::HTTPServer.new(:Port => 8000, :DocumentRoot => Dir.pwd).start'
```

Then open http://localhost:8000.

## Updating ride data

`serve.rb` handles the Strava OAuth flow and calls `latest` with the resulting access token. It reads credentials from environment variables:

- `STRAVA_CLIENT_ID`
- `STRAVA_CLIENT_SECRET`

The easiest way to run the update flow is via `do-it`, which sources credentials from `tmp/env.sh` before invoking `serve.rb`:

```bash
./do-it
```

After authenticating in your browser, new activities are fetched, converted to miles, and appended to `rides.json`. The script then commits and pushes the updated file to `main`.

## Deployment

The site is deployed automatically to GitHub Pages via `.github/workflows/static.yml` on every push to `main`.
