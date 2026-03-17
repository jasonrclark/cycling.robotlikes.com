# cycling.robotlikes.com

A small static site and data repository used to publish ride and walk data for [cycling.robotlikes.com](https://cycling.robotlikes.com).

## What this repo contains

- `index.html` — main site
- `code.js` — site JavaScript
- `walking.html` — walking-specific page
- `rides.json`, `raw-rides.json`, `new-rides.json` — ride data files (large JSON datasets)
- `walks.json` — walking data
- `serve.rb`, `Gemfile`, `Gemfile.lock` — Ruby server and dependencies (fetches data from Strava and serves the site locally)
- `do-it` — shell script that sources Strava credentials and starts the server
- `latest` — script to fetch the latest rides from Strava
- `new-to-old.sh` — script to migrate new-format ride data to old format
- `CNAME` — custom domain for GitHub Pages
- `favicons` and other static assets

## Run locally

### Static browsing

The site is static and can be viewed by opening `index.html` in a browser, or served with Python:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

### Full local development (with Strava integration)

`serve.rb` starts a WEBrick server on port 9090 and handles the Strava OAuth callback to update ride data.

**Prerequisites:**

1. Install Ruby dependencies:
   ```bash
   bundle install
   ```

2. Create `tmp/env.sh` with your Strava API credentials:
   ```bash
   mkdir -p tmp
   cat > tmp/env.sh <<'EOF'
   export STRAVA_CLIENT_ID=your_client_id
   export STRAVA_CLIENT_SECRET=your_client_secret
   EOF
   ```
   You can create a Strava API application at <https://www.strava.com/settings/api>.

3. Start the server:
   ```bash
   source do-it
   ```
   The script will print a Strava authorization URL. Open it in a browser to authorize and trigger a ride data fetch.

   Alternatively, start the server directly if credentials are already in your environment:
   ```bash
   bundle exec ruby serve.rb
   ```

## Data files

This repository includes several large JSON data files used by the site to display ride/walk information:

| File | Description |
|------|-------------|
| `rides.json` | Processed ride data displayed on the site |
| `raw-rides.json` | Raw ride data as returned from Strava |
| `new-rides.json` | Newer-format ride data |
| `walks.json` | Walking activity data |

If these are regenerated or replaced, keep the same filenames or update the site code accordingly.

## Deployment

The presence of a `CNAME` file indicates this site is published via GitHub Pages to a custom domain. To publish changes, push to the `main` branch (or whichever branch is configured for Pages) and ensure GitHub Pages settings are correct.

## Contributing

- Open an issue describing the change or data update.
- Send a pull request with the modification; for large data updates, prefer creating a script that ingests/validates the data.

## License

Add a LICENSE file or update this section with the project license.
