# 🚴 cycling.robotlikes.com

A personal cycling stats dashboard that pulls ride data from [Strava](https://www.strava.com) and displays it as interactive charts.

Live at: **[cycling.robotlikes.com](https://cycling.robotlikes.com)**

## What It Does

- Fetches ride data from Strava via OAuth
- Stores rides locally in `rides.json`
- Displays interactive charts for:
  - Per-ride distance (bar chart)
  - Cumulative total distance over time
  - Average speed per ride

## Adding New Rides

New rides are fetched from Strava using the `latest` script and the Strava API. The flow:

1. Start the local server and complete Strava OAuth: `./do-it`
2. After authorizing, the server fetches any rides newer than the most recent one in `rides.json`, converts units (meters → miles, m/s → mph), and appends them.
3. Changes are committed and pushed automatically.

To inspect what a raw Strava export looks like before transforming it, use `new-to-old.sh` with a `new-rides.json` file.

## Running Locally

```bash
cp tmp/env.sh.example tmp/env.sh  # add your Strava client ID and secret
bundle install
./do-it
```

Then visit `http://localhost:9090` and complete the Strava OAuth flow to refresh ride data.

## Environment Variables

| Variable | Description |
|---|---|
| `STRAVA_CLIENT_ID` | Your Strava API application client ID |
| `STRAVA_CLIENT_SECRET` | Your Strava API application client secret |

Set these in `tmp/env.sh` (not committed to the repo).

## Tech Stack

- **Frontend**: Vanilla HTML/JS with [Chart.js](https://www.chartjs.org/)
- **Data**: JSON flat-file (`rides.json`)
- **Strava integration**: [`strava-ruby-client`](https://github.com/dblock/strava-ruby-client) gem
- **Local dev server**: WEBrick (Ruby)

---

## 🚲 Fun Biking Facts

- **Bikes outnumber cars** — there are roughly twice as many bicycles in the world as automobiles.
- **Efficient machine** — a bicycle is the most energy-efficient form of human transport ever invented; cycling 1 mile burns about the same energy as walking 4 miles.
- **Long history** — the first recognizable bicycle (the "draisine") was invented by Karl von Drais in 1817 — over 200 years ago.
- **Tour de France** — riders in the Tour de France burn an estimated 8,000–10,000 calories per stage and cover roughly 3,400 km (2,100 miles) over three weeks.
- **Speed record** — the absolute human-powered land speed record on a bicycle is **296.01 km/h (183.93 mph)**, set by Denise Mueller-Korenek in 2018 (with a pace vehicle).
- **Health boost** — regular cycling is associated with a 46% lower risk of cardiovascular disease and a 45% lower risk of all-cause mortality compared to non-cyclists.
- **Low impact** — cycling puts about 8× less stress on knee joints than running, making it a great option for long-term fitness.
- **Global popularity** — the Netherlands has more bicycles per capita than any other country — roughly 1.3 bikes per person.
