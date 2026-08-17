# Robot Likes Cycling

Static charts for cycling and walking activity data published at `cycling.robotlikes.com`.

## What is here

- `index.html` shows cycling charts backed by `rides.json`.
- `walking.html` shows walking charts backed by `walks.json`.
- `code.js` contains the shared Chart.js helpers.
- `latest` fetches newer Strava rides and appends them to `rides.json`.
- `serve.rb` starts a local OAuth callback server used when updating ride data from Strava.

## Local setup

Install the Ruby dependencies:

```sh
bundle install
```

Serve the site from the repository root with any static file server, then open the local URL in a browser.

```sh
ruby -run -e httpd . -p 8000
```

The charts load data from `/rides.json` and `/walks.json`, so serve the repository root rather than opening the HTML files directly.

## Updating ride data

Create a local environment file with Strava OAuth settings:

```sh
mkdir -p tmp
cat > tmp/env.sh <<'EOF'
export STRAVA_CLIENT_ID=your-client-id
export STRAVA_CLIENT_SECRET=your-client-secret
EOF
```

Then run:

```sh
./do-it
```

Follow the printed Strava authorization URL. After authorization, `serve.rb` runs `latest`, updates `rides.json`, and commits the change.
