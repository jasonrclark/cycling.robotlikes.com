# cycling.robotlikes.com

Static site for [cycling.robotlikes.com](https://cycling.robotlikes.com), with charts and totals built from `rides.json`.

## Local preview

From the repository root:

```sh
ruby -rwebrick -e 'WEBrick::HTTPServer.new(:Port => 8000, :DocumentRoot => Dir.pwd).start'
```

Then open <http://localhost:8000>.

## Updating ride data

- `latest` fetches newer Strava activities and appends them to `rides.json`.
- `serve.rb` starts an OAuth callback server and runs `latest` after authorization.

Expected environment variables:

- `STRAVA_CLIENT_ID`
- `STRAVA_CLIENT_SECRET`

## Deployment

GitHub Actions deploys the repository to GitHub Pages on pushes to `main` via `.github/workflows/static.yml`.
