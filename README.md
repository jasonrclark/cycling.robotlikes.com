# cycling.robotlikes.com

A personal stats dashboard for cycling and walking activities, powered by Strava and hosted on GitHub Pages. Because apparently just *doing* the exercise wasn't enough — now the robot needs charts about it too.

## Overview

- Pulls activity data from the Strava API and stores it as JSON in the repo (git: now also a fitness tracker)
- Displays interactive charts for ride/walk distance, speed, and cumulative totals
- Two pages: cycling (`index.html`) and walking (`walking.html`) — yes, walking gets its own page, it's doing its best
- Deployed automatically to GitHub Pages on every push to `main`

## Quick start

Prerequisites:
- Ruby (see `Gemfile` for gems: `strava-ruby-client`, `strava-ruby-cli`, `webrick`, etc.)
- A Strava account with an API application ([create one here](https://www.strava.com/settings/api)) — you'll need to explain to Strava that you are, in fact, a robot who likes cycling
- Legs (optional, but helps with the cycling part)

Install dependencies:

```sh
bundle install
```

Set up credentials:

```sh
mkdir -p tmp
cat > tmp/env.sh <<'EOF'
export STRAVA_CLIENT_ID=your_client_id
export STRAVA_CLIENT_SECRET=your_client_secret
EOF
```

Run locally:

```sh
./do-it
```

This starts a local server on port 9090 and prints a Strava OAuth URL. Open that URL in your browser to authorize and fetch the latest rides. The server also handles the OAuth callback automatically, so you can go back to lying on the couch and admiring your mileage.

## Usage

### Update ride data

After authenticating via the OAuth flow (triggered by `./do-it`), the `latest` script fetches any new Strava activities since your most recent ride and appends them to `rides.json` (or `walks.json`), then commits and pushes. Your suffering is now version-controlled.

To inspect raw new-ride data before importing:

```sh
./new-to-old.sh   # pretty-prints key fields from new-rides.json using jq
```

## File structure

```
index.html        # Cycling stats page — the main event
walking.html      # Walking stats page — the undercard
code.js           # Shared chart/display logic (Chart.js)
rides.json        # Stored cycling activity data — your entire biking history, as JSON
walks.json        # Stored walking activity data — all that pacing around
latest            # Ruby script: fetches new Strava activities → updates rides.json
serve.rb          # Local dev server: handles Strava OAuth callback
do-it             # Entrypoint: sources credentials and starts serve.rb (very motivational name)
new-to-old.sh     # Helper: inspect raw Strava JSON with jq
new-rides.json    # Scratch file for raw Strava API responses
Gemfile           # Ruby dependencies
.github/
  workflows/
    static.yml    # GitHub Actions: deploy to GitHub Pages on push to main
tmp/
  env.sh          # Local credentials (gitignored, unlike your Strava KOMs)
```

## Configuration

| Variable | Description |
|---|---|
| `STRAVA_CLIENT_ID` | Your Strava API application client ID |
| `STRAVA_CLIENT_SECRET` | Your Strava API application client secret — keep this secret, seriously |

Both are set in `tmp/env.sh` (sourced by `do-it`; this file is gitignored).

## Deploy

Any push to `main` triggers the `Deploy static content to Pages` GitHub Actions workflow, which uploads the repo root as a GitHub Pages artifact and deploys it. No manual deploy steps are needed — GitHub does the heavy lifting so you can focus on the heavy pedaling.

## Troubleshooting

**OAuth callback fails locally**
- Make sure `tmp/env.sh` exists and exports valid Strava credentials.
- If running in a GitHub Codespace, the redirect URL is automatically set to the forwarded port URL. The robot is very adaptable.

**No new rides appearing**
- The `latest` script fetches activities created *after* the most recent `created_at` in `rides.json`. If your last ride is missing or has an old date, rides may not appear. In other words: the robot only knows what you tell it.
- Check that your Strava token has `activity:read` scope. It can't read what it's not allowed to read — it's a robot, not a hacker.

## License

No license specified — personal project. Please don't steal the vibes.
