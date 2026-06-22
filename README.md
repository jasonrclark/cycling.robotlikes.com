# cycling.robotlikes.com

Source for https://cycling.robotlikes.com, a small static site that charts personal cycling and walking activity.

## What is in this repository

The site is served as plain static files:

- `index.html` renders the cycling dashboard
- `walking.html` renders the walking dashboard
- `code.js` contains the shared chart and vanity-metric helpers
- `rides.json` contains the published cycling data
- `walks.json` contains the published walking data
- `raw-rides.json` and `new-rides.json` are data snapshots used while working with ride imports
- `latest` fetches recent Strava activities and appends them to `rides.json`
- `serve.rb` runs the local OAuth callback flow used for ride updates

## Local preview

Install the Ruby dependencies:

```sh
bundle install
```

Then serve the repository root as a static site:

```sh
ruby -rwebrick -e 'WEBrick::HTTPServer.new(:Port => 8000, :DocumentRoot => Dir.pwd).start'
```

Open http://localhost:8000 to view the cycling page and http://localhost:8000/walking.html to view the walking page.

## Updating cycling data from Strava

The repository includes a small Strava import flow for refreshing `rides.json`.

1. Create `tmp/env.sh` with the environment variables expected by the scripts:
   - `STRAVA_CLIENT_ID`
   - `STRAVA_CLIENT_SECRET`
2. Start the OAuth helper:

   ```sh
   source tmp/env.sh
   bundle exec ruby serve.rb
   ```

3. Visit the authorization URL printed by `serve.rb`.
4. After Strava redirects back to `/auth`, the app will run `latest`, update `rides.json`, and show the resulting output.

The importer uses the most recent `created_at` value in `rides.json` and requests newer activities from Strava.

## Data shape

Cycling entries in `rides.json` are expected to include fields such as:

- `ride_date`
- `distance`
- `duration`
- `average_speed`
- `max_speed`
- `where_to`
- `created_at`

Walking entries in `walks.json` are simpler and currently store:

- `walk_date`
- `distance`

## Deployment

GitHub Actions deploys the repository to GitHub Pages on every push to `main`. The workflow lives at `.github/workflows/static.yml`.
