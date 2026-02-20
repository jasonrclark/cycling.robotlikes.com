# cycling.robotlikes.com

A robot that likes cycling. Charts your Strava rides because spreadsheets are for cowards.

## Get it running

1. `bundle install` — grab the gems
2. Create `tmp/env.sh` with your [Strava API](https://www.strava.com/settings/api) creds (gitignored, don't embarrass yourself):
   ```bash
   export STRAVA_CLIENT_ID=your_client_id
   export STRAVA_CLIENT_SECRET=your_client_secret
   ```
3. `./do-it` — starts a server on :9090, prints a Strava OAuth URL, click it, profit

After OAuth the server auto-fetches new rides, updates `rides.json`, and pushes to `main`. You're welcome.
