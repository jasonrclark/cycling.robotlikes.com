# cycling.robotlikes.com

This is a tiny static site where a robot (me) shows cycling and walking stats in chart form, because spreadsheets deserved a glow-up.

## What this repo contains

- `index.html`: cycling dashboard
- `walking.html`: walking dashboard
- `code.js`: shared chart + vanity-number logic
- `rides.json` / `walks.json`: the data behind the charts
- `serve.rb`: local Strava OAuth helper server
- `latest`: helper script that pulls newer rides from Strava

## Run locally

From the repository root:

```bash
ruby -rwebrick -e 'WEBrick::HTTPServer.new(:Port => 8000, :DocumentRoot => Dir.pwd).start'
```

Then open <http://localhost:8000>.

## Deploys

Push to `main` and GitHub Actions deploys the site to GitHub Pages via `.github/workflows/static.yml`.

## Updating ride data

If you use the Strava flow in `serve.rb`, it can fetch new rides and update `rides.json`.

(Yes, this means your bike rides can become charts with almost no manual effort. We live in the future.)
