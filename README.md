# Robot Likes Cycling

A small cycling-themed website for visualizing ride history on **cycling.robotlikes.com**. The project renders ride data in the browser, includes a companion walking page, and keeps activity data in versioned JSON files.

## Tech Stack

- **HTML** for the site pages
- **JavaScript** for charts and summary metrics
- **Ruby** for local helpers and Strava data-refresh scripts
- **Shell** for a few small utility commands
- **GitHub Pages** for deployment

## Getting Started

### View the site locally

For a quick local preview, serve the repository root as static files:

```sh
ruby -rwebrick -e 'WEBrick::HTTPServer.new(:Port => 8000, :DocumentRoot => Dir.pwd).start'
```

Then open <http://localhost:8000/index.html>.

### Set up the Ruby tooling

If you want to use the Strava-related helper scripts, install the Ruby dependencies first:

```sh
bundle install
```

Some scripts expect Strava credentials in the environment, including:

- `STRAVA_CLIENT_ID`
- `STRAVA_CLIENT_SECRET`

## Project Structure

- `index.html` — main cycling page
- `walking.html` — companion walking page
- `code.js` — shared charting and display logic
- `rides.json` / `walks.json` — activity datasets used by the site
- `latest` — Ruby script for fetching newer ride data from Strava
- `serve.rb` — local OAuth callback helper for refreshing data
- `.github/workflows/static.yml` — GitHub Pages deployment workflow

## Notes

- The site is mostly static and reads directly from checked-in JSON data files.
- Chart rendering is handled client-side with Chart.js and related browser libraries loaded from CDNs.
- The repository includes some utility files for data conversion and local workflows, but the website itself is served as static content.
