# cycling.robotlikes.com

A personal stats site for cycling and walking activities, hosted at [cycling.robotlikes.com](https://cycling.robotlikes.com) via GitHub Pages. Activity data is pulled from [Strava](https://www.strava.com/) and displayed as interactive charts using Chart.js.

## File Structure

```
.
├── index.html        # Cycling stats page
├── walking.html      # Walking stats page
├── code.js           # Shared charting/display logic
├── rides.json        # Stored cycling activity data
├── walks.json        # Stored walking activity data
├── latest            # Ruby script to fetch new rides from Strava
├── serve.rb          # Local dev server (WEBrick + Strava OAuth)
├── do-it             # Convenience script to start the local server
├── new-rides.json    # Scratch file for incoming ride data
├── new-to-old.sh     # Helper to migrate data format
├── Gemfile           # Ruby dependencies
└── CNAME             # GitHub Pages custom domain config
```

## Strava API Setup

1. Create a Strava API application at [strava.com/settings/api](https://www.strava.com/settings/api).
2. Create a `tmp/` directory (it's gitignored) and add a `tmp/env.sh` file with your credentials:

```sh
export STRAVA_CLIENT_ID=your_client_id
export STRAVA_CLIENT_SECRET=your_client_secret
```

## Local Development

Install Ruby dependencies:

```sh
bundle install
```

Start the local server:

```sh
./do-it
```

This sources `tmp/env.sh` and starts a WEBrick server on port 9090. The script will print a Strava OAuth URL — open it in your browser to authorize and trigger a data fetch.

## Updating Ride Data

After authorizing via the OAuth flow in the browser, the server automatically:

1. Fetches new activities from Strava since the last recorded ride.
2. Appends them to `rides.json`.
3. Commits and pushes the updated `rides.json` to `main`.

You can also run the `latest` script directly with an access token:

```sh
bundle exec ./latest <access_token>
```

## Deployment

The site is deployed via GitHub Pages. Pushing changes to `main` (including `rides.json` or `walks.json` updates) automatically updates the live site at [cycling.robotlikes.com](https://cycling.robotlikes.com).
