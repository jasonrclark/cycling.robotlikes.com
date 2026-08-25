# Robot Likes Cycling

A static dashboard for visualizing cycling and walking activity data with
[Chart.js](https://www.chartjs.org/).

The site is available at [cycling.robotlikes.com](https://cycling.robotlikes.com).

## Local development

Install the Ruby dependencies:

```sh
bundle install
```

Start the local server:

```sh
bundle exec ruby serve.rb
```

The site will be available at <http://localhost:9090>.

## Updating ride data

Ride data is stored in `rides.json` and imported from Strava. Set
`STRAVA_CLIENT_ID` and `STRAVA_CLIENT_SECRET`, then start `serve.rb` and open
the authorization URL printed in the terminal. After authorization, the server
runs `latest` to append new activities to `rides.json`.

Walking data is stored separately in `walks.json`.

## Deployment

Pushes to `main` deploy the repository as a static site through GitHub Pages.
