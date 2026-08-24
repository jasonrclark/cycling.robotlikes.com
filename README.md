# cycling.robotlikes.com

Static site for visualizing cycling and walking activity data.

## What is in this repository

- `index.html`: cycling charts and summary metrics
- `walking.html`: walking charts and summary metrics
- `code.js`: shared charting and helper functions used by both pages
- `rides.json`: cycling data source
- `walks.json`: walking data source
- `latest`: Ruby script invoked by `serve.rb`'s `/auth` handler to fetch new rides from Strava and append them to `rides.json`
- `.github/workflows/static.yml`: GitHub Pages deployment workflow

## Local development

1. Install dependencies:
   - `bundle install`
2. Start the local server:
   - `bundle exec ruby serve.rb`

You can also use `./do-it`, which loads environment variables and starts the server.

## Updating ride data

The update flow uses Strava OAuth and the `latest` script.

1. Set `STRAVA_CLIENT_ID` and `STRAVA_CLIENT_SECRET` (for example by exporting them in your shell, or by creating `tmp/env.sh` and using `./do-it`).
2. Run `bundle exec ruby serve.rb` (or run `./do-it` if you set variables in `tmp/env.sh`).
3. Open the authorization URL printed in the terminal.
4. Complete authorization to trigger `/auth`, which runs the `latest` script and updates `rides.json`.
