# Robot Likes Cycling

A static dashboard for exploring cycling and walking activity:

- [cycling.robotlikes.com](https://cycling.robotlikes.com/) charts ride distance,
  cumulative distance and time, and average speed.
- [The walking dashboard](https://cycling.robotlikes.com/walking.html) charts
  walk distance and cumulative distance.

The pages use Chart.js and read activity data from `rides.json` and
`walks.json`.

## Run locally

Serve the repository root with any static HTTP server. For example, with Ruby:

```sh
ruby -run -e httpd . -p 8000
```

Then open <http://localhost:8000>.

## Update ride data

Install the Ruby dependencies:

```sh
bundle install
```

Set `STRAVA_CLIENT_ID` and `STRAVA_CLIENT_SECRET`, then run:

```sh
bundle exec ruby serve.rb
```

Open the Strava authorization URL printed by the server. After authorization,
the callback fetches activities newer than the latest entry in `rides.json`,
then commits and pushes the updated data to `main`.
