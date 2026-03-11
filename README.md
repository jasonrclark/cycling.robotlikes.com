# 🤖🚴 cycling.robotlikes.com

A website where a robot obsessively tracks how far it has pedaled, because apparently just *going* on bike rides wasn't enough — we also need charts about it.

Also there's walking. Robots contain multitudes.

## What Is This?

This is a static GitHub Pages site that pulls cycling (and walking) data from [Strava](https://www.strava.com/) and displays it as charts. The charts answer important questions like:

- "Am I getting faster?" *(probably not)*
- "How many total miles have I ridden?" *(more than zero, fewer than a Tour de France cyclist)*
- "Should I feel good about myself today?" *(the chart will decide)*

## File Structure

```
.
├── index.html        # Cycling glory, rendered in Chart.js
├── walking.html      # For when the robot's gears are tired
├── rides.json        # The permanent record of every ride (no expunging)
├── walks.json        # The permanent record of every walk
├── code.js           # The JavaScript that makes numbers into pretty lines
├── latest            # Ruby script: "fetch me my new accomplishments"
├── serve.rb          # Local dev server + Strava OAuth wrangler
├── do-it             # Shell script whose name perfectly captures the energy
└── new-to-old.sh     # jq one-liner living its best life
```

## Setup

### Strava API Credentials

You'll need a Strava API app. Go to [strava.com/settings/api](https://www.strava.com/settings/api), create one, and then:

```sh
mkdir tmp
cat > tmp/env.sh <<EOF
export STRAVA_CLIENT_ID=your_client_id_here
export STRAVA_CLIENT_SECRET=your_client_secret_here
EOF
```

Keep `tmp/` out of git (it already is — `.gitignore` has your back).

### Install Dependencies

```sh
bundle install
```

## Local Development

Run the local server, which also handles Strava OAuth so you can fetch new rides:

```sh
./do-it
```

This sources your credentials and starts a WEBrick server on port 9090. It will print a Strava authorization URL. Click it, approve the OAuth prompt, and the server will automatically fetch your latest rides, update `rides.json`, and commit + push. Very "do it" energy.

If you're in a GitHub Codespace, it will even figure out the right public callback URL automatically, because this code is considerate like that.

## Updating Ride Data

The `latest` script fetches any rides newer than the most recent one in `rides.json` and appends them. It converts Strava's metric units to miles (sorry, rest of the world) and rounds things nicely.

It's called automatically by `serve.rb` after OAuth completes, so you usually don't need to run it directly. But you could. Nobody's stopping you.

## Deployment

This site is hosted on [GitHub Pages](https://pages.github.com/). Push to `main`, and your updated stats are live. The `CNAME` file points things at `cycling.robotlikes.com`.

That's it. No build step. No bundler. No webpack config that takes 45 minutes to understand. Just files.

## Why?

Because staring at your own biking statistics is a perfectly normal hobby and nobody can tell us otherwise.
