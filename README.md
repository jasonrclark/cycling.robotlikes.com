# cycling.robotlikes.com

A static website that displays cycling and walking activity stats pulled from [Strava](https://www.strava.com/), hosted at [cycling.robotlikes.com](https://cycling.robotlikes.com).

Charts are built with [Chart.js](https://www.chartjs.org/) and include distance, speed, and cumulative totals over time.

## File Structure

```
.
├── index.html        # Cycling stats page
├── walking.html      # Walking stats page
├── code.js           # Chart rendering and helper functions
├── rides.json        # Stored cycling activity data
├── walks.json        # Stored walking activity data
├── latest            # Ruby script to fetch new rides from Strava
├── new-to-old.sh     # Helper script to inspect raw Strava activity JSON
├── new-rides.json    # Scratch file for raw Strava API output
├── raw-rides.json    # Raw ride data before processing
├── serve.rb          # Local WEBrick server handling Strava OAuth flow
├── do-it             # Script to start the local development server
├── Gemfile           # Ruby dependencies
└── .github/
    └── workflows/
        └── static.yml  # GitHub Actions workflow for GitHub Pages deployment
```

## Strava API Setup

The site uses the [Strava API](https://developers.strava.com/) to fetch activity data. You'll need a Strava API application and your credentials stored locally.

1. Create a Strava API application at [strava.com/settings/api](https://www.strava.com/settings/api).
2. Create the file `tmp/env.sh` (this directory is gitignored) with your credentials:

   ```sh
   export STRAVA_CLIENT_ID=your_client_id
   export STRAVA_CLIENT_SECRET=your_client_secret
   ```

## Local Development

Start the local server, which handles the Strava OAuth flow and serves the site on port 9090:

```sh
./do-it
```

This sources `tmp/env.sh` and runs `serve.rb`. The script will print a Strava authorization URL — open it in your browser to complete the OAuth flow. After authorizing, Strava will redirect back to the local server, which fetches new activities and updates `rides.json`.

> **GitHub Codespaces:** The server automatically detects the `CODESPACE_NAME` environment variable and uses the correct forwarded port URL for the OAuth redirect.

## Updating Ride Data

To fetch new rides since the last recorded activity:

```sh
bundle exec ./latest <access_token>
```

This updates `rides.json` with any new cycling activities from Strava since the most recent entry.

The `serve.rb` OAuth flow runs this automatically after a successful authorization.

## Deployment

The site is deployed to [GitHub Pages](https://pages.github.com/) automatically via the GitHub Actions workflow in `.github/workflows/static.yml`. Any push to the `main` branch triggers a deployment of the full repository as a static site.

The custom domain is configured via the `CNAME` file (`cycling.robotlikes.com`).
