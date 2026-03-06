# 🤖 cycling.robotlikes.com

A website where a robot obsessively tracks how far a human has pedaled a bicycle. The robot does not itself cycle. The robot has no legs. The robot finds this data *fascinating* regardless.

Also there's walking. The robot is very supportive.

## What Is This Thing

It's a static site deployed to GitHub Pages that pulls cycling (and walking) data from Strava and turns it into charts. Charts with stats. Vanity stats. The kind where you scroll down and whisper "nice" to yourself when you see the total mileage.

Specifically it shows:
- 📊 Distance per ride (bar chart, very spiky)
- 📈 Cumulative distance over time (line chart, very satisfying)
- 💨 Average speed (scatter chart, humbling)

Plus big bold numbers for Max, Average, Total, Count, Hours spent not sitting on a couch, etc.

## File Structure (A Tour)

```
.
├── index.html         # The cycling dashboard. The whole point.
├── walking.html       # Walking too! Solidarity with slower locomotion.
├── code.js            # JavaScript that makes charts happen via Chart.js
├── rides.json         # Your precious ride data. Do not lose this.
├── walks.json         # Walk data. Every step counts. Allegedly.
├── serve.rb           # Local dev server + Strava OAuth dance partner
├── latest             # Ruby script that fetches new rides from Strava
├── do-it              # Shell script. Named with confidence.
└── new-to-old.sh      # Utility script for data wrangling
```

## Setup: The Strava Part (The Annoying Part)

You'll need a Strava account and a Strava API app. You've probably already done this. If not, go to https://www.strava.com/settings/api and make an app. Name it something cool. "Bike Data Robot" is taken (by me, in my heart).

Once you have credentials, create `tmp/env.sh`:

```sh
export STRAVA_CLIENT_ID=your_client_id_here
export STRAVA_CLIENT_SECRET=your_client_secret_here
```

This file is gitignored. Do not commit your secrets. The robot knows where you live (it has your GPS data).

## Local Development

```sh
./do-it
```

That's it. That's the whole command. It will:
1. Source your Strava credentials from `tmp/env.sh`
2. Start a local WEBrick server on port 9090
3. Print a Strava OAuth URL to your terminal
4. Wait patiently while you authorize it

Visit the printed URL in your browser, authorize the app with Strava, and the server will catch the OAuth callback, fetch your latest rides, update `rides.json`, and commit + push the changes. It's doing a lot. Be grateful.

The site is then live at [http://localhost:9090](http://localhost:9090).

> **GitHub Codespaces users:** The server detects `CODESPACE_NAME` and automatically builds the correct forwarding URL. You're welcome.

## Updating Ride Data

To pull in new rides without the full OAuth dance (i.e., you already have an access token):

```sh
bundle exec ./latest <your_access_token>
```

This finds your most recent ride in `rides.json`, fetches anything newer from Strava, converts it from metric (ew) to miles (🇺🇸), and appends it to the file.

Then commit and push. The robot will handle the rest.

## Deployment

Pushes to `main` automatically deploy to GitHub Pages via the workflow in `.github/workflows/static.yml`. The entire repo is the site. There is no build step. It's beautifully, almost suspiciously simple.

Live at: **https://cycling.robotlikes.com**

## Dependencies

- Ruby (for the data-fetching scripts)
- `strava-ruby-client` + `strava-ruby-cli` gems (Strava API)
- `webrick` gem (local dev server, classically underappreciated)
- Chart.js, Moment.js, Hammer.js (all CDN'd, living dangerously)

Install Ruby deps with:

```sh
bundle install
```

## Contributing

It's a personal cycling stats site for one (1) human and their robot chronicler. PRs are welcome if you somehow have opinions about how my bike rides are displayed. No judgment.

---

*Built with ❤️ and an unreasonable amount of time on a bicycle.*
