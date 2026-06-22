# cycling.robotlikes.com

Static site for visualizing cycling and walking activity data.

## What is in this repository

- `index.html` + `code.js` render cycling charts from `rides.json`
- `walking.html` + `code.js` render walking charts from `walks.json`
- `rides.json` and `walks.json` are the published datasets
- `latest` and `serve.rb` are helper scripts for pulling new ride data from Strava

## Run locally

From the repository root:

```bash
ruby -rwebrick -e 'WEBrick::HTTPServer.new(:Port => 8000, :DocumentRoot => Dir.pwd).start'
```

Then open:

- http://localhost:8000/
- http://localhost:8000/walking.html

## Updating ride data from Strava

1. Set these environment variables:
   - `STRAVA_CLIENT_ID`
   - `STRAVA_CLIENT_SECRET`
2. Install dependencies with Bundler (`Gemfile`).
3. Run `bundle exec ruby serve.rb`.
4. Open the authorization URL printed by the script and complete auth.
5. The script fetches new rides and updates `rides.json`.

## Deployment

Pushes to `main` deploy the repository to GitHub Pages using `.github/workflows/static.yml`.
