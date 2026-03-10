# cycling.robotlikes.com 🚴🤖

A website where a robot obsessively tracks how far a human has pedaled, because apparently that's what robots do when they're not taking over the world.

Live at: [cycling.robotlikes.com](https://cycling.robotlikes.com)

---

## What Is This?

This is a static site that fetches ride data from [Strava](https://www.strava.com/) and displays it as charts. The robot has opinions about your average speed. The robot is judging you.

There's also a walking page (`/walking.html`), for those days when your legs stage a rebellion and refuse to clip in.

---

## File Structure

```
.
├── index.html        # Cycling charts. The main event. The whole reason we're here.
├── walking.html      # For when cycling is too fast and walking is too slow
├── code.js           # Chart magic. Do not touch. Seriously.
├── rides.json        # Your entire cycling history. Laid bare. No secrets.
├── walks.json        # Your walking history. Even more embarrassing.
├── serve.rb          # Local dev server + Strava OAuth. It's doing a lot.
├── latest            # Ruby script that fetches new rides from Strava
├── new-to-old.sh     # Converts new-rides.json format. A utility from a simpler time.
├── do-it             # Runs the server. Named with appropriate gravitas.
└── Gemfile           # Ruby dependencies. strava-ruby-client does the heavy lifting.
```

---

## Strava API Setup

The site pulls data from Strava. Strava requires OAuth, which requires credentials, which requires you to set up a Strava app like it's 2013 and APIs were a novelty.

1. Go to [https://www.strava.com/settings/api](https://www.strava.com/settings/api) and create an app
2. Create `tmp/env.sh` with your credentials (this file is gitignored, don't commit your secrets):

```sh
export STRAVA_CLIENT_ID=your_client_id_here
export STRAVA_CLIENT_SECRET=your_client_secret_here
```

---

## Local Development

```sh
bundle install   # Install dependencies (do this once, or whenever Bundler yells at you)
./do-it          # Starts the server on port 9090 and prints an OAuth URL
```

Open the OAuth URL in a browser, authorize with Strava, and get redirected back to `/auth`. The server will exchange the code for a token, fetch your latest rides, update `rides.json`, and commit + push automatically.

Yes, it commits and pushes from inside a web request handler. We don't talk about that.

> **GitHub Codespaces:** The server auto-detects `CODESPACE_NAME` and adjusts the redirect URL accordingly, because the robot is thoughtful like that.

---

## Updating Ride Data

The `latest` script fetches any rides newer than the most recent one in `rides.json`:

```sh
bundle exec ./latest YOUR_ACCESS_TOKEN
```

This is normally called automatically by `serve.rb` after OAuth. If you're running it manually, you probably already know what you're doing.

---

## Deployment

Pushing to `main` automatically deploys to GitHub Pages via the workflow in `.github/workflows/static.yml`. No build step required — it's just HTML, JS, and JSON. Beautifully, almost suspiciously, simple.

---

## Tech Stack

| Thing | What it does |
|---|---|
| Chart.js | Makes the pretty charts |
| moment.js | Handles dates so we don't have to |
| chartjs-plugin-zoom | Lets you zoom in on that one suspiciously slow ride |
| strava-ruby-client | Talks to Strava |
| WEBrick | Ruby's built-in web server, living its best life |
| GitHub Pages | Hosts the whole thing for free, bless |

---

*The robot does not get tired. The robot does not have rest days. The robot is disappointed in your rest days.*
