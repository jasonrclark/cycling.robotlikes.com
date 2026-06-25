# cycling.robotlikes.com

Static files for https://cycling.robotlikes.com.

## What's here

- `index.html` renders cycling charts from `rides.json`
- `walking.html` renders walking charts from `walks.json`
- `code.js` contains shared chart helpers
- `latest` refreshes ride data from Strava
- `serve.rb` starts the local OAuth callback flow used for ride updates

## Local preview

There is no build step for the site. From the repository root, start a simple web server:

```sh
ruby -rwebrick -e 'WEBrick::HTTPServer.new(:Port => 8000, :DocumentRoot => Dir.pwd).start'
```

Then open http://localhost:8000/.

## Updating ride data

Install the Ruby dependencies first:

```sh
bundle install
```

Set the Strava credentials in your environment:

- `STRAVA_CLIENT_ID`
- `STRAVA_CLIENT_SECRET`

To refresh `rides.json`, run:

```sh
bundle exec ruby serve.rb
```

The script prints an authorization URL and a local callback URL. After completing the Strava authorization flow, it uses `latest` to fetch newer activities and rewrite `rides.json`.

## Deployment

Pushes to `main` deploy the repository to GitHub Pages with `.github/workflows/static.yml`.
