# cycling.robotlikes.com

A personal cycling stats site that pulls ride data from [Strava](https://www.strava.com/) and displays it as interactive charts. Deployed at [cycling.robotlikes.com](https://cycling.robotlikes.com) via GitHub Pages.

There's also a companion walking stats page at `/walking.html`.

## File Structure

```
.
├── index.html          # Cycling stats page (distance, speed charts)
├── walking.html        # Walking stats page
├── code.js             # Chart.js chart/vanity metric helpers
├── rides.json          # Stored cycling ride data
├── walks.json          # Stored walking data
├── raw-rides.json      # Raw Strava API response data
├── new-rides.json      # Staging file for newly fetched rides
├── latest              # Ruby script: fetches new rides from Strava
├── new-to-old.sh       # Shell script to inspect raw ride JSON with jq
├── serve.rb            # Local dev server + Strava OAuth handler
├── do-it               # Wrapper script to start serve.rb
├── site                # Minimal static file server (no Strava auth)
├── Gemfile             # Ruby dependencies
└── .github/workflows/
    └── static.yml      # GitHub Pages deployment workflow
```

## Strava API Setup

1. Create a [Strava API application](https://www.strava.com/settings/api) and note your **Client ID** and **Client Secret**.
2. Create `tmp/env.sh` (this file is gitignored):
   ```sh
   export STRAVA_CLIENT_ID=your_client_id
   export STRAVA_CLIENT_SECRET=your_client_secret
   ```

## Local Development

Install Ruby dependencies:

```sh
bundle install
```

Start the local server (sources `tmp/env.sh` for Strava credentials):

```sh
./do-it
```

The server starts on port 9090. It prints a Strava OAuth authorization URL — open it in a browser to authorize and trigger a ride data update.

To browse the site without Strava auth, run the minimal server from `site`:

```sh
ruby site
```

## Updating Ride Data

To fetch rides added since the last update, run the OAuth flow via `./do-it`. On successful authorization, `serve.rb` will:

1. Exchange the OAuth code for an access token.
2. Run `./latest <access_token>` to fetch new activities from Strava and append them to `rides.json`.
3. Commit and push the updated `rides.json` to `main`.

To inspect raw ride data from `new-rides.json`:

```sh
./new-to-old.sh
```

## Deployment

Pushing to `main` automatically deploys the site to GitHub Pages via `.github/workflows/static.yml`. The entire repository root is served as static content.
