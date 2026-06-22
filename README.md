# cycling.robotlikes.com

A personal cycling (and walking) activity tracker at [cycling.robotlikes.com](https://cycling.robotlikes.com), built as a static site deployed to GitHub Pages.

Ride data is pulled from [Strava](https://www.strava.com) and stored as JSON in the repository. Charts are rendered client-side using [Chart.js](https://www.chartjs.org/).

## Local preview

Serve the site locally with Ruby's built-in WEBrick:

```sh
ruby -rwebrick -e 'WEBrick::HTTPServer.new(:Port => 8000, :DocumentRoot => Dir.pwd).start'
```

Then open [http://localhost:8000](http://localhost:8000).

## Updating ride data

Ride data lives in `rides.json`. To pull in new activities from Strava:

1. Copy `tmp/env.sh.example` (if present) or create `tmp/env.sh` with your Strava credentials:

   ```sh
   export STRAVA_CLIENT_ID=<your_client_id>
   export STRAVA_CLIENT_SECRET=<your_client_secret>
   ```

2. Install dependencies:

   ```sh
   bundle install
   ```

3. Run the OAuth + fetch script:

   ```sh
   ./do-it
   ```

   This starts a local server on port 9090, opens the Strava OAuth flow, and on successful auth runs `latest` to fetch new activities and append them to `rides.json`.

4. Commit and push the updated `rides.json` to `main`. GitHub Actions will redeploy the site automatically.

## Deployment

Pushes to `main` trigger `.github/workflows/static.yml`, which deploys the site to GitHub Pages.
