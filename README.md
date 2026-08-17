# Robot Likes Cycling

Static charts for cycling and walking activity data, published at
<https://cycling.robotlikes.com>.

## What is here

- `index.html` renders cycling charts from `rides.json`.
- `walking.html` renders walking charts from `walks.json`.
- `code.js` contains the shared Chart.js helpers used by both pages.
- `latest` fetches newer Strava activities and appends them to `rides.json`.
- `serve.rb` starts a local OAuth callback server for updating ride data.
- `.github/workflows/static.yml` deploys the static site to GitHub Pages.

## Local development

The site is static, so it can be served from the repository root with any static
file server. For example:

```sh
ruby -run -e httpd . -p 8000
```

Then open <http://localhost:8000>.

## Updating ride data

Install Ruby dependencies:

```sh
bundle install
```

Set `STRAVA_CLIENT_ID` and `STRAVA_CLIENT_SECRET`, then run the OAuth helper:

```sh
bundle exec ruby serve.rb
```

Follow the printed Strava authorization URL. After authorization, the callback
updates `rides.json` with new activities.

## Deployment

Pushes to `main` deploy the repository contents to GitHub Pages.
