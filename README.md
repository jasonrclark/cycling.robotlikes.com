# cycling.robotlikes.com

Static site for visualizing cycling and walking activity data.

## Run locally

1. Install gems:
   - `bundle install`
2. Set environment variables:
   - `STRAVA_CLIENT_ID`
   - `STRAVA_CLIENT_SECRET`
3. Start the local server:
   - `bundle exec ruby serve.rb`
4. Open `http://localhost:9090`.

## Update ride data

- Start the server and open the Strava authorization URL printed in the terminal.
- After authorization, `rides.json` is updated automatically via the `/auth` callback.

## Key files

- `index.html` — cycling dashboard
- `walking.html` — walking dashboard
- `code.js` — chart helpers and shared UI logic
- `rides.json` — cycling data
- `walks.json` — walking data
