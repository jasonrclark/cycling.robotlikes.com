# 🤖 Robot Likes Cycling

A website where a robot obsessively tracks every bike ride because apparently that's what robots do when they're not taking over the world.

Live at [cycling.robotlikes.com](https://cycling.robotlikes.com) — yes, it's a real domain. No, the robot does not have a cycling jersey. Yet.

## What Is This?

This is a personal cycling stats dashboard that pulls ride data from [Strava](https://strava.com) and displays it as pretty charts. It answers the deeply important questions:

- How far did I ride?
- How fast was I going? (Spoiler: not that fast.)
- How many hours of my life have I spent on a bike? (Spoiler: a lot.)

There's also a [walking page](https://cycling.robotlikes.com/walking.html), because the robot doesn't discriminate against legs.

## Features

- 📊 **Per-ride distance chart** — each bar is a cry for validation
- 📈 **Cumulative distance chart** — watch the miles add up and feel something
- ⚡ **Average speed chart** — relive the glory and the suffering
- 🏆 **Vanity stats** — max distance, average speed, total hours, total days (yes, *days*)

## File Structure

```
.
├── index.html        # The cycling page. The main event.
├── walking.html      # For when the robot's legs are tired
├── code.js           # The JavaScript that makes the charts go brrr
├── rides.json        # Every ride, immortalized in JSON
├── walks.json        # Every walk, also immortalized
├── raw-rides.json    # Raw Strava data, unfiltered and unashamed
├── latest            # Ruby script that fetches new rides from Strava
├── serve.rb          # Local dev server + Strava OAuth handler
├── do-it             # The "just make it work" script
├── new-to-old.sh     # Converts new-format rides to old format
└── Gemfile           # Ruby dependencies (the robot runs on Ruby)
```

## Setup

### Prerequisites

- Ruby (the robot's language of choice)
- A [Strava account](https://strava.com) and a willingness to share your embarrassing ride data with an app

### Strava API Credentials

1. Create a Strava API app at [strava.com/settings/api](https://www.strava.com/settings/api)
2. Note your **Client ID** and **Client Secret** (guard these with your life, or at least with a `.gitignore`)
3. Create a `tmp/` directory and add an `env.sh` file:

```sh
export STRAVA_CLIENT_ID=your_client_id_here
export STRAVA_CLIENT_SECRET=your_client_secret_here
```

The `tmp/` directory is gitignored. You're welcome.

### Install Dependencies

```sh
bundle install
```

## Running Locally

```sh
./do-it
```

That's it. That's the whole command. It sources your credentials, starts a local server on port 9090, and prints a Strava OAuth URL. Click the URL, authorize the app, and watch it fetch your rides.

The server also handles the OAuth callback automatically. Very fancy. Very robot.

## Updating Ride Data

When you've gone on more rides and want the charts to reflect your continued dedication to suffering uphill:

1. Run `./do-it`
2. Follow the printed OAuth URL
3. Authorize with Strava
4. The `latest` script fetches any rides since your last update, converts units (because Strava uses meters like some kind of *European*), and appends them to `rides.json`
5. Commit and push — GitHub Actions will deploy automatically

Unit conversions performed with zero regrets:
- Meters → miles (`× 0.000621371`)
- m/s → mph (`× 2.23694`)

## Deployment

This site deploys itself to [GitHub Pages](https://pages.github.com/) automatically on every push to `main`. The GitHub Actions workflow in `.github/workflows/static.yml` handles it. You don't have to do anything. The robot takes care of it.

Custom domain is set via the `CNAME` file pointing to `cycling.robotlikes.com`.

## Security & Privacy

Here's what lives in this repo and is therefore public:

- **`rides.json` / `walks.json`** — your activity data (distances, speeds, dates, ride names). If your ride is named "Secret Donut Run", the world will know.
- **`raw-rides.json`** — unprocessed Strava response data. Same deal.

Here's what must **never** be committed:

- **`tmp/env.sh`** — contains your `STRAVA_CLIENT_ID` and `STRAVA_CLIENT_SECRET`. The `tmp/` directory is gitignored for exactly this reason. Do not move these values anywhere else in the repo.
- **Access tokens** — the OAuth token passed to `./latest` is temporary, but don't log it, hardcode it, or sneeze it into a file that gets committed.

If you accidentally commit a secret: rotate it immediately at [strava.com/settings/api](https://www.strava.com/settings/api). Git history is forever, but tokens don't have to be.

## Why?

Because keeping a training log in a spreadsheet is for people who don't have a website about a robot.
