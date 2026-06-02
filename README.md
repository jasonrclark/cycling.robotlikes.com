# 🤖🚴 cycling.robotlikes.com

A robot who apparently has legs and opinions about mileage. This is a personal cycling stats site that sucks ride data out of [Strava](https://www.strava.com/) and turns it into pretty charts so you can feel good (or bad) about yourself. Deployed to GitHub Pages at [cycling.robotlikes.com](https://cycling.robotlikes.com) for the whole internet to admire (or ignore).

## 📊 What it does

Stares at your Strava data and judges you — lovingly — with charts:

- 🚵 **Per-ride distance** – bar chart of each ride's distance in miles (some of those bars are embarrassingly short)
- 📈 **Cumulative distance** – scatter chart of total miles over time (the line goes up! mostly!)
- 💨 **Average speed** – scatter chart of average speed per ride (yes, that one slow day is still there)

Plus a wall of vanity stats: max distance, average distance, ride count, total miles, total hours, total days, and max/average speed — perfect for bragging at dinner parties nobody invited you to.

Oh, and there's a 🚶 [walking page](https://cycling.robotlikes.com/walking.html) too, for when the robot's legs get tired.

## 🗂️ Files (a tour of the chaos)

| File | What it's doing here |
|------|----------------------|
| `index.html` | The main show 🎪 Cycling charts live here |
| `walking.html` | For when the bike is in the shop 🦶 |
| `code.js` | The JavaScript that makes the charts go brrr 📉 |
| `rides.json` | All your precious ride data, lovingly formatted 🏅 |
| `walks.json` | All your precious walk data, lovingly formatted 🥾 |
| `latest` | Ruby script that begs Strava for new rides and staples them onto `rides.json` 🙏 |
| `serve.rb` | A tiny WEBrick server that catches the Strava OAuth callback and kicks off a data refresh 🎣 |
| `do-it` | Shell script that yells "let's go!" and fires up `serve.rb` 🚀 |
| `new-to-old.sh` | A `jq` one-liner for converting raw Strava JSON to the old format. It works, don't touch it 🧙 |
| `raw-rides.json` | Raw Strava API spew, kept around just in case 🗑️ |
| `new-rides.json` | Intermediate new-rides file, the caterpillar before the butterfly 🦋 |

## 🔄 Updating ride data

The data refresh flow is a delightful OAuth dance 💃:

1. 🔑 Drop your Strava credentials into `tmp/env.sh` (client ID and secret — guard these with your life, or at least with `.gitignore`).
2. 🏃 Run `./do-it` — a local server wakes up and prints a Strava authorization URL.
3. 🌐 Open that URL in your browser and click the "Yes Strava, I trust this sketchy localhost server" button.
4. 🎉 The callback handler fetches your new rides, updates `rides.json`, and auto-commits + pushes. Magic!

### 🔐 Environment variables

| Variable | What it is |
|----------|------------|
| `STRAVA_CLIENT_ID` | Your Strava API application client ID (don't leak it, please 🙈) |
| `STRAVA_CLIENT_SECRET` | Your Strava API application client secret (seriously, don't 🙉) |

## 💻 Local development

```bash
bundle install
# Then crack open index.html in a browser, or spin up any static file server you trust
# (the robot is not picky)
```

## 🚢 Deployment

Push to `main` and GitHub Actions takes over like a very responsible intern — automatically deploying to GitHub Pages via `.github/workflows/static.yml`. Zero effort, maximum glory. 🏆
