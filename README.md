# Robot Likes Cycling 🤖🚴

A website where a robot obsessively tracks every bike ride and walk taken by its human, because apparently that's what robots do for fun now.

## What Is This?

This is a personal stats dashboard for cycling and walking activities, powered by the Strava API and an overwhelming desire to look at charts about things you already did. Did you ride your bike? Great. Now look at a graph of it. Did you walk somewhere? Also a graph. Graphs forever.

The site lives at [cycling.robotlikes.com](https://cycling.robotlikes.com) and features:

- 📊 **Charts** — Bar charts! Scatter plots! The full spectrum of nerd achievement.
- 🚴 **Cycling stats** — Distance, speed, total miles, how many of your life-hours you've spent on a bike seat.
- 🚶 **Walking stats** — Same thing but slower and in kilometers, because walking is more of a metric-system vibe.

## How It Works

1. You go outside and do physical activity like some kind of animal.
2. Strava records it.
3. A Ruby script OAuth-dances with Strava and dumps the data into a JSON file.
4. That JSON file is **committed directly to the git repository** because who needs a database when you have `git blame`.
5. GitHub Pages serves it all up as a static site.
6. The robot is pleased.

## Setup

### Prerequisites

- Ruby (for the server that does the Strava OAuth tango)
- A Strava account and API app (go make one, it's free and only takes forever)
- The will to live, at least until the OAuth flow completes

### Strava Credentials

Create `tmp/env.sh` and put your secrets in it:

```sh
export STRAVA_CLIENT_ID=your_client_id_here
export STRAVA_CLIENT_SECRET=your_client_secret_here
```

This file is gitignored, so your secrets stay secret. Unlike your embarrassing average speed, which is immortalized in `rides.json` forever.

### Install Dependencies

```sh
bundle install
```

## Running Locally

```sh
./do-it
```

That's it. That's the whole command. The script sources your credentials and fires up a WEBrick server on port 9090. WEBrick! It's like Ruby said "what if we made a web server, but cozy?"

The server will print a Strava authorization URL. Open it, authorize the app, and get redirected back to `/auth`. This triggers the OAuth token exchange, fetches your latest activities, updates `rides.json`, and commits + pushes to main. Automatically. While you watch. It's a lot.

## Updating Data

New rides don't fetch themselves (unfortunately). Run the local server and go through the OAuth flow again. The `latest` script handles fetching activities after your most recent recorded ride and appending them to `rides.json`.

Yes, this means you have to do the OAuth dance every time you want fresh data. Yes, this is fine. The robot has made peace with it.

## Deployment

The site is deployed via GitHub Pages straight from the `main` branch. Push to main, the site updates. The data update process even commits and pushes for you, so the cycle is beautifully, disturbingly complete.

## File Structure

```
.
├── index.html        # Cycling stats page
├── walking.html      # Walking stats page
├── code.js           # Chart rendering logic (it's doing its best)
├── rides.json        # Your entire cycling history, in a flat file, in git
├── walks.json        # Your entire walking history, same deal
├── new-rides.json    # Staging area for incoming rides
├── raw-rides.json    # The raw, unprocessed truth
├── serve.rb          # Ruby server that orchestrates the Strava OAuth flow
├── latest            # Script to fetch new activities from Strava
├── do-it             # Entry point. Just... do it.
├── new-to-old.sh     # Migrates new rides into the main dataset
├── Gemfile           # Ruby dependencies
└── CNAME             # Tells GitHub Pages what domain to use
```

## Why "Robot Likes"?

Unclear. The robot was consulted and declined to comment.
