# cycling.robotlikes.com

A personal cycling stats site that pulls ride data from Strava and displays it as charts. Deployed at [cycling.robotlikes.com](https://cycling.robotlikes.com) via GitHub Pages.

## What it does

The site shows three charts for all recorded rides:

- **Ride Distance** — bar chart of distance per ride (miles)
- **Total Distance** — cumulative mileage over time
- **Average Speed** — scatter plot of average speed per ride (mph)

Vanity stats (max distance, total hours, total days on the bike, etc.) are shown alongside each chart.

There's also a walking stats page at [cycling.robotlikes.com/walking.html](https://cycling.robotlikes.com/walking.html).

## File structure

```
index.html        # Main cycling stats page
walking.html      # Walking stats page
code.js           # Chart rendering and vanity stat helpers
rides.json        # Processed ride data (committed to repo)
walks.json        # Processed walk data
raw-rides.json    # Raw Strava API output (for reference)
new-rides.json    # Scratch file used during data updates
new-to-old.sh     # Helper to inspect raw Strava fields
latest            # Ruby script to fetch new rides from Strava and append to rides.json
serve.rb          # Local dev server: handles Strava OAuth and triggers data update
site              # One-liner to serve the site locally without Strava OAuth
Gemfile           # Ruby dependencies
```

## Local development

### Prerequisites

- Ruby (with Bundler)
- A Strava API application ([create one here](https://www.strava.com/settings/api))

### Install dependencies

```bash
bundle install
```

### Serve the site without Strava

To just browse the site locally using the committed `rides.json`:

```bash
ruby -rwebrick -e'WEBrick::HTTPServer.new(:Port => 8000, :DocumentRoot => Dir.pwd).start'
```

Then open [http://localhost:8000](http://localhost:8000).

### Fetch new ride data

1. Create `tmp/env.sh` with your Strava credentials:

   ```bash
   export STRAVA_CLIENT_ID=your_client_id
   export STRAVA_CLIENT_SECRET=your_client_secret
   ```

2. Run the dev server:

   ```bash
   source tmp/env.sh
   bundle exec ruby serve.rb
   ```

3. The script prints an authorization URL. Open it in a browser and authorize the app.

4. Strava redirects back to `localhost:9090/auth`, which triggers `latest` to fetch new rides, appends them to `rides.json`, and commits and pushes the result.

> **Note:** If running in a GitHub Codespace, the redirect URL is automatically set to the forwarded port URL.

## Updating ride data manually

The `latest` script can be run directly if you already have an access token:

```bash
bundle exec ./latest <access_token>
```

It reads the most recent ride in `rides.json`, fetches any Strava activities created after that, converts units (meters → miles, m/s → mph), and appends the results to `rides.json`.

## Deployment

Pushes to `main` automatically deploy to GitHub Pages via the workflow in `.github/workflows/static.yml`. The entire repository is served as a static site.
