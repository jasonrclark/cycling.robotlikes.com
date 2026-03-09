# cycling.robotlikes.com

A personal activity tracking dashboard that displays cycling and walking data pulled from Strava. Hosted as a static site on GitHub Pages and updated by running a local OAuth sync script.

## What It Does

- Displays interactive charts for cycling rides (distance, cumulative distance, average/max speed)
- Displays charts for walking activities
- Pulls new activities from the Strava API via OAuth
- Stores activity data as JSON files committed to the repository
- Auto-deploys to GitHub Pages on every push to `main`

Live site: [cycling.robotlikes.com](https://cycling.robotlikes.com)

## File Structure

```
index.html        # Cycling dashboard
walking.html      # Walking dashboard
code.js           # Shared Chart.js charting and stats functions
rides.json        # All cycling activities (distance in miles, speed in mph)
walks.json        # All walking activities (distance in km)
serve.rb          # WEBrick server that handles Strava OAuth and syncs rides
do-it             # Shell script to source credentials and start serve.rb
site              # Shell script to start a static server on port 8000
latest            # Ruby script that fetches new rides from Strava API
new-to-old.sh     # jq script to transform raw Strava data into project format
new-rides.json    # Staging file for raw Strava API responses
raw-rides.json    # Archive of full raw Strava API responses
Gemfile           # Ruby dependencies
CNAME             # Custom domain for GitHub Pages
.github/          # GitHub Actions workflow for auto-deployment
```

## Strava API Setup

1. Create a Strava API application at [strava.com/settings/api](https://www.strava.com/settings/api)
2. Set the **Authorization Callback Domain** to `localhost`
3. Note your **Client ID** and **Client Secret**
4. Create `tmp/env.sh` with your credentials:

```bash
export STRAVA_CLIENT_ID=your_client_id
export STRAVA_CLIENT_SECRET=your_client_secret
```

## Local Development

Install Ruby dependencies:

```bash
bundle install
```

### Static server only (view existing data)

```bash
./site
```

Starts a WEBrick server on port 8000. Open [http://localhost:8000](http://localhost:8000) to view the site.

### Sync new rides from Strava

```bash
./do-it
```

1. Sources credentials from `tmp/env.sh`
2. Starts an OAuth server on port 9090
3. Prints a Strava authorization URL — visit it in your browser and approve access
4. Fetches any new activities since the last recorded ride
5. Appends them to `rides.json`
6. Commits and pushes the updated file to Git

## Data Format

**rides.json** — cycling activities (distance in miles, speed in mph):

```json
{
  "strava_id": 8118522967,
  "ride_date": "2022-11-14",
  "duration": 640,
  "average_speed": 11.49,
  "max_speed": 12.11,
  "created_at": "2022-11-14 12:33:22 UTC",
  "where_to": "Evening Ride",
  "distance": 2.02
}
```

**walks.json** — walking activities (distance in km):

```json
{
  "walk_date": "2024-03-19",
  "distance": 13.75
}
```

## Deployment

The site is deployed to GitHub Pages automatically via GitHub Actions on every push to `main`. The workflow uploads the repository contents and deploys them using the Pages API.

The custom domain (`cycling.robotlikes.com`) is configured via the `CNAME` file and a DNS CNAME record pointing to GitHub's servers.
