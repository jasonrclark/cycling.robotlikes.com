# Robot Likes Cycling

The source for [cycling.robotlikes.com](https://cycling.robotlikes.com), a small static
site that charts my Strava cycling rides and walks over time.

## How it works

- `rides.json` and `walks.json` store the ride/walk history used to render the charts.
- `index.html` renders the cycling charts, `walking.html` renders the walking charts, and
  both load `code.js` (built on Chart.js) to draw them.
- `serve.rb` runs a local WEBrick server that handles the Strava OAuth callback, used to
  authorize access to new activity data.
- `latest` is a Ruby script that fetches new activities from Strava (via the
  [`strava-ruby-cli`](https://rubygems.org/gems/strava-ruby-cli)) and appends them to
  `rides.json`.
- `new-to-old.sh` reformats raw Strava activity JSON (`new-rides.json`) into the shape
  used by `rides.json`.
- The site is deployed to GitHub Pages via the workflow in
  `.github/workflows/static.yml` on every push to `main`.

## Updating ride data

1. Set the `STRAVA_CLIENT_ID` and `STRAVA_CLIENT_SECRET` environment variables.
2. Run `./do-it` (or `bundle exec ruby serve.rb`) to start the local server and open the
   printed authorization URL.
3. After authorizing, the callback fetches new activities, updates `rides.json`, and
   commits/pushes the change.

## Dependencies

Ruby dependencies are managed with Bundler; see `Gemfile` / `Gemfile.lock`. Install them
with:

```sh
bundle install
```
