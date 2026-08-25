# cycling.robotlikes.com

Small static site for visualizing cycling and walking activity data.

## What is in this repo

- `index.html`: cycling charts and summary stats
- `walking.html`: walking charts and summary stats
- `code.js`: shared chart helpers
- `rides.json` / `walks.json`: activity datasets used by the site
- `latest`: script that fetches new Strava rides and updates `rides.json`
- `serve.rb`: local server and Strava OAuth callback endpoint

## Local setup

1. Install dependencies:
   - `bundle install`
2. Run the local server:
   - `bundle exec ruby serve.rb`
3. Open `http://localhost:9090/index.html` (or `walking.html`).

## Updating ride data from Strava

Set these environment variables first:

- `STRAVA_CLIENT_ID`
- `STRAVA_CLIENT_SECRET`

Then start `serve.rb`, complete the OAuth flow using the URL it prints, and it will run `latest` to refresh `rides.json`.
