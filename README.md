# cycling.robotlikes.com

Static files for [cycling.robotlikes.com](https://cycling.robotlikes.com), a small GitHub Pages site that charts ride and walk history.

## Files

- `index.html` renders the cycling dashboard from `rides.json`
- `walking.html` renders the walking dashboard from `walks.json`
- `code.js` contains the shared Chart.js helpers
- `rides.json` stores ride history
- `walks.json` stores walk history
- `latest` fetches newer rides from Strava and appends them to `rides.json`
- `serve.rb` starts a local OAuth callback server used by the Strava update flow

## Local preview

This repo is a static site, so you can preview it directly from the repository root:

```sh
ruby -rwebrick -e 'WEBrick::HTTPServer.new(:Port => 8000, :DocumentRoot => Dir.pwd).start'
```

Then open <http://localhost:8000>.

## Updating ride data

The Strava scripts expect `STRAVA_CLIENT_ID` and `STRAVA_CLIENT_SECRET` in the environment.

- `bundle exec ruby serve.rb` starts the local auth flow
- `bundle exec ./latest <access-token>` fetches new rides and updates `rides.json`

## Deployment

GitHub Actions deploys the repository to GitHub Pages whenever `main` is updated.
