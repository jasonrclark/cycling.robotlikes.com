# Robot Likes Cycling

Static charts for cycling and walking activity at [cycling.robotlikes.com](https://cycling.robotlikes.com).

## What is here

- `index.html` renders cycling charts from `rides.json`.
- `walking.html` renders walking charts from `walks.json`.
- `code.js` contains shared Chart.js helpers.
- `serve.rb` starts a local OAuth callback server for fetching new Strava rides.
- `latest` fetches activities from Strava and appends them to `rides.json`.
- `.github/workflows/static.yml` deploys the repository to GitHub Pages.

## Local development

Install Ruby dependencies:

```sh
bundle install
```

Serve the static site locally:

```sh
ruby -rwebrick -e'WEBrick::HTTPServer.new(:Port => 8000, :DocumentRoot => Dir.pwd).start'
```

Then open <http://localhost:8000>.

## Updating ride data

Set the Strava OAuth credentials expected by `serve.rb` and `latest`:

```sh
export STRAVA_CLIENT_ID=...
export STRAVA_CLIENT_SECRET=...
```

Start the OAuth helper:

```sh
bundle exec ruby serve.rb
```

Open the printed Strava authorization URL. After authorization, the callback runs `latest`, updates `rides.json`, and commits the ride update.

## Deployment

Pushes to `main` trigger the GitHub Pages workflow, which uploads and deploys the repository contents.
