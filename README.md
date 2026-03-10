# 🚴 cycling.robotlikes.com

A website where a robot obsessively tracks how far a human has pedaled. The human does the sweating. The robot does the bragging.

Live at **[cycling.robotlikes.com](https://cycling.robotlikes.com)** — because apparently just riding bikes wasn't enough; the data needed its own domain.

---

## What Is This?

A static GitHub Pages site that pulls ride (and, grudgingly, walk 🚶) data from [Strava](https://www.strava.com/) and turns it into charts. Charts that will either motivate you or shame you, depending on the month.

Stats on display:
- Per-ride distance (bar chart, so every slow day is immortalized forever)
- Cumulative total distance (a line that only goes up, unlike your motivation in January)
- Average speed (spoiler: wind was definitely a factor)

There's also a walking page, which exists because sometimes the bike is flat and dignity must be preserved.

---

## File Structure

```
.
├── index.html          # The cycling dashboard. Your legacy.
├── walking.html        # The walk of shame dashboard.
├── code.js             # Chart.js wrangling. Surprisingly not a mess.
├── rides.json          # Every ride, immortalized in JSON.
├── walks.json          # Every walk, also immortalized. Sorry.
├── raw-rides.json      # Raw Strava data, before it gets cleaned up and presentable.
├── new-rides.json      # Staging area for rides that haven't made it to the big leagues yet.
├── latest              # Ruby script that fetches new rides from Strava. The workhorse.
├── new-to-old.sh       # Converts new-format ride data to old format. A bridge between eras.
├── serve.rb            # Local dev server + Strava OAuth handler. Does a lot for 42 lines.
├── do-it               # Shell script. Two lines. Named with confidence.
├── Gemfile             # Ruby dependencies. Very few. Respect.
└── .github/workflows/  # GitHub Actions deploys the site on every push to main. Magic.
```

---

## Setup

### Strava API Credentials

You'll need a [Strava API application](https://www.strava.com/settings/api). Once you have one, create `tmp/env.sh` (gitignored, so your secrets stay secret):

```sh
export STRAVA_CLIENT_ID=your_client_id_here
export STRAVA_CLIENT_SECRET=your_client_secret_here
```

This file is sourced by `do-it` before anything happens. Don't commit it. You'll have a bad time.

### Ruby Dependencies

```sh
bundle install
```

---

## Running Locally

```sh
./do-it
```

That's it. That's the command. The script sources your credentials and fires up a local WEBrick server at `http://localhost:9090`.

It will also print a Strava OAuth URL. Open it in your browser, authorize the app, and you'll be redirected back to `/auth` where the magic happens: new rides are fetched, appended to `rides.json`, and committed automatically.

> Works in GitHub Codespaces too — it detects `CODESPACE_NAME` and adjusts the redirect URL automatically, because it's thoughtful like that.

---

## Updating Ride Data

To pull in new rides after the initial setup, run the same `./do-it` flow. The `latest` script finds your most recent ride in `rides.json`, asks Strava for anything newer, converts units from metric (🇪🇺) to imperial (🇺🇸), and appends the results.

Distances are in **miles**. Speeds are in **mph**. The robot is American.

---

## Deployment

Every push to `main` automatically deploys to GitHub Pages via the workflow in `.github/workflows/static.yml`. No build step. No bundler. Just files going straight to the internet like it's 2004.

```
push to main → GitHub Actions → GitHub Pages → cycling.robotlikes.com
```

If the site is broken, you probably pushed bad JSON. Check `rides.json`.

---

## Tech Stack

| Thing | Why |
|---|---|
| HTML/JS | It's a website |
| [Chart.js](https://www.chartjs.org/) | Pretty charts with zoom support |
| [Strava API](https://developers.strava.com/) | Where the rides come from |
| Ruby + WEBrick | Local dev server. Old faithful. |
| GitHub Pages | Free hosting. The robot is frugal. |
| GitHub Actions | Automated deployment. The robot is also lazy. |

---

## Contributing

It's a personal cycling stats site. Contributions are welcome if you somehow care about someone else's bike rides, or if you want to fork it and track your own. Godspeed.
