# cycling.robotlikes.com

Static site files for visualizing cycling and walking activity data.

## Pages

- `index.html` renders cycling charts from `rides.json`
- `walking.html` renders walking charts from `walks.json`

## Local development

1. Install dependencies:
   - `bundle install`
2. Start the local server:
   - `bundle exec ruby serve.rb`
3. Open:
   - `http://localhost:9090/index.html`
   - `http://localhost:9090/walking.html`

## Updating ride data from Strava

1. Set Strava credentials in your environment:
   - `STRAVA_CLIENT_ID`
   - `STRAVA_CLIENT_SECRET`
2. Run `bundle exec ruby serve.rb` and open the auth URL shown in the terminal.
3. After authorization, the `/auth` handler runs the `latest` Ruby script to append new rides to `rides.json`.
