# Robot Likes Cycling

The source for [cycling.robotlikes.com](https://cycling.robotlikes.com), a static
dashboard of cycling activity. The site also includes a walking dashboard at
`/walking.html`.

## Run locally

The dashboard is static HTML, JavaScript, and JSON. Serve the repository root
with any static file server, then open `index.html` in a browser.

```sh
python3 -m http.server
```

## Activity data

- `rides.json` contains the cycling activities shown on the main dashboard.
- `walks.json` contains the walking activities shown on the walking dashboard.
- The `./latest` Ruby script retrieves cycling activities from Strava and appends them to
  `rides.json`.

To update ride data from Strava, install the Ruby dependencies and provide
these environment variables:

```sh
bundle install
export STRAVA_CLIENT_ID=...
export STRAVA_CLIENT_SECRET=...
```

Run `./do-it` to start the local authorization server. Open the authorization
URL it prints, authorize the application, and the callback retrieves new rides.
The `do-it` script loads `tmp/env.sh` if you prefer to store the variables
locally; that directory is ignored by Git.

## Deployment

Pushing to `main` deploys the entire repository to GitHub Pages. The custom
domain is configured in `CNAME`.
