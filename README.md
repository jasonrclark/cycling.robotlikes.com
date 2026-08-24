# cycling.robotlikes.com

Static site for visualizing cycling and walking activity data.

## What is in this repository

- `index.html` + `code.js`: cycling charts and summary metrics
- `walking.html` + `code.js`: walking charts and summary metrics
- `rides.json`: cycling data source
- `walks.json`: walking data source
- `latest`: Ruby script that fetches new rides from Strava and appends them to `rides.json`
- `.github/workflows/static.yml`: GitHub Pages deployment workflow

## Local development

1. Install dependencies:
   - `bundle install`
2. Start the local server:
   - `bundle exec ruby serve.rb`

You can also use `./do-it`, which loads environment variables and starts the server.

## Updating ride data

The update flow uses Strava OAuth and the `latest` script.

1. Set `STRAVA_CLIENT_ID` and `STRAVA_CLIENT_SECRET`.
2. Run `bundle exec ruby serve.rb`.
3. Open the authorization URL printed in the terminal.
4. Complete authorization to trigger `/auth`, which runs the `latest` script and updates `rides.json`.
