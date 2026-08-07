# cycling.robotlikes.com

Static site and scripts for visualizing cycling (and walking) activity data from Strava.

## Repository layout

- `/workspaces/index.html` — cycling dashboard
- `/workspaces/walking.html` — walking dashboard
- `/workspaces/code.js` — shared chart helpers
- `/workspaces/rides.json` — cycling activity data source
- `/workspaces/walks.json` — walking activity data source
- `/workspaces/latest` — fetches new Strava rides and appends them to `rides.json`
- `/workspaces/serve.rb` — local OAuth callback helper for refreshing ride data

## Local setup

1. Install gems:
   - `bundle install`
2. Provide Strava credentials in your environment:
   - `STRAVA_CLIENT_ID`
   - `STRAVA_CLIENT_SECRET`
3. Start the local helper server:
   - `bundle exec ruby serve.rb`
4. Open the printed authorize URL, complete auth, then use the callback output to review updated `rides.json`.

## Viewing the site locally

Serve the repository root with any static server and open:

- `/index.html` for cycling
- `/walking.html` for walking
