# cycling.robotlikes.com

Static site for visualizing cycling and walking activity data.

## What is in this repository

- `index.html` + `rides.json`: cycling charts and summary stats
- `walking.html` + `walks.json`: walking charts and summary stats
- `code.js`: shared charting/helpers for both pages
- `latest`: script to fetch newer Strava activities and append to `rides.json`
- `.github/workflows/static.yml`: deploys the site to GitHub Pages

## Local preview

From the repository root:

```bash
ruby -rwebrick -e 'WEBrick::HTTPServer.new(:Port => 8000, :DocumentRoot => Dir.pwd).start'
```

Then open <http://localhost:8000>.

## Updating ride data

1. Set `STRAVA_CLIENT_ID` and `STRAVA_CLIENT_SECRET`.
2. Install gems:

   ```bash
   bundle install
   ```

3. Start the auth/update server:

   ```bash
   bundle exec ruby serve.rb
   ```

4. Open the authorization URL printed by the server and complete auth.
5. The callback triggers `latest`, updates `rides.json`, and prints the resulting diff.

## Deployment

Pushes to `main` trigger GitHub Actions deployment to GitHub Pages.
