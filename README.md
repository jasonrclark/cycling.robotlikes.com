# 🤖🚴 cycling.robotlikes.com

> A website where a robot stares at cycling data and feels things.

## What Is This?

This is a personal stats site that pulls cycling (and walking!) activity data from Strava and displays it in gloriously over-engineered charts. Because nothing says "I went for a bike ride" quite like a scatter plot.

The site lives at [cycling.robotlikes.com](https://cycling.robotlikes.com) and answers the deeply important question: *how many miles has this person pedaled, and was any of it fast?*

## Features

- 📊 **Charts** — Distance per ride, cumulative distance over time, and average speed. Basically a shrine to your own mediocrity (or greatness, no judgment).
- 🚶 **Walking page too** — Because sometimes the robot gets off the bike. (`/walking.html`)
- 🔄 **Strava integration** — Pulls real activity data via OAuth so you don't have to manually log "went for a ride, it was fine."
- 📈 **Vanity stats** — Max distance, average distance, total hours, total days spent riding. Yes, *days*. It adds up.

## File Structure

```
.
├── index.html          # Cycling charts. The main event.
├── walking.html        # Walking charts. The sequel nobody asked for but secretly enjoys.
├── code.js             # All the chart magic lives here
├── rides.json          # Your cycling data. Guard it with your life (or don't, it's just JSON).
├── walks.json          # Your walking data. Slower JSON.
├── serve.rb            # Local dev server + Strava OAuth handler. It does a lot.
├── latest              # Ruby script that fetches new rides from Strava
├── new-to-old.sh       # Converts Strava's raw JSON into something less horrifying
├── do-it               # Shell script. Named with appropriate enthusiasm.
└── Gemfile             # Ruby dependencies. The robot needs gems.
```

## Setup

### 1. Strava API Credentials

You'll need a Strava API app. Go to [strava.com/settings/api](https://www.strava.com/settings/api), create one, and grab your Client ID and Secret. Then create `tmp/env.sh`:

```sh
export STRAVA_CLIENT_ID=your_client_id_here
export STRAVA_CLIENT_SECRET=your_client_secret_here
```

Don't commit this file. It's in `.gitignore`. Don't be that person.

### 2. Install Dependencies

```sh
bundle install
```

### 3. Run It

```sh
./do-it
```

That's it. That's the whole command. The script will print a Strava OAuth URL — open it in your browser, authorize the app, and it'll fetch your latest rides and drop them into `rides.json`.

The local server runs at [http://localhost:9090](http://localhost:9090). Open it up and behold your data.

> **Codespaces users:** The server auto-detects if you're in a GitHub Codespace and uses the forwarded port URL. The robot is thoughtful like that.

## Updating Ride Data

When you want to pull in new rides (i.e., after you've actually gone outside):

```sh
./do-it
```

Same command. It only fetches rides newer than your most recent one, so it won't re-import everything every time. Efficient. The robot approves.

## Deployment

The site is hosted on GitHub Pages. When `rides.json` is updated and pushed to `main`, the charts update automatically. The `CNAME` file points the domain at `cycling.robotlikes.com`.

To manually trigger a data update and deploy:

1. Run `./do-it`
2. The OAuth flow fetches new rides and runs `git commit` + `git push` automatically
3. GitHub Pages picks up the change
4. The robot is pleased

## Tech Stack

- **Frontend:** Vanilla HTML/JS, [Chart.js](https://www.chartjs.org/), Moment.js, Hammer.js (for pinch-to-zoom, because why not)
- **Backend (local only):** Ruby, WEBrick, [strava-ruby-client](https://github.com/dblock/strava-ruby-client)
- **Hosting:** GitHub Pages (free, as the robot prefers)

---

*"The robot does not experience joy. But the robot does experience a 14.3 mph average speed, which is basically the same thing."*
