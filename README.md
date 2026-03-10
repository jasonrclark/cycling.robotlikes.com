# 🤖 cycling.robotlikes.com

A website where a robot obsessively tracks how far a human has pedaled. The human does the suffering. The robot makes charts about it.

Live at [cycling.robotlikes.com](https://cycling.robotlikes.com) — come watch the miles accumulate in real time (well, whenever someone bothers to update the data).

---

## What Is This Thing?

It's a static website that pulls ride data from [Strava](https://www.strava.com/), stores it in JSON, and renders a bunch of charts so you can stare at your own fitness data and feel either proud or deeply ashamed. Possibly both.

Charts included:
- 📊 **Ride Distance** — How far you went each time. The bars of triumph (and shame).
- 📈 **Total Distance** — Cumulative miles. Watching this go up is basically a drug.
- 💨 **Average Speed** — Because going fast matters, apparently.

There's also a [walking page](https://cycling.robotlikes.com/walking.html) for days when the legs just say "absolutely not."

---

## File Structure

```
.
├── index.html        # The cycling dashboard. The main event.
├── walking.html      # For when cycling is too hard
├── code.js           # Chart wizardry lives here
├── rides.json        # Your precious ride data. Do not delete.
├── walks.json        # Your precious walk data. Also do not delete.
├── new-rides.json    # Staging area for rides before they make it to the big leagues
├── serve.rb          # Local dev server + Strava OAuth dance partner
├── latest            # Ruby script that fetches new rides from Strava
├── new-to-old.sh     # jq one-liner for inspecting raw ride data
├── do-it             # The script. It does it.
└── Gemfile           # Ruby dependencies, because of course
```

---

## Setup

### 1. Get Strava Credentials

You'll need a Strava API app. Go to [strava.com/settings/api](https://www.strava.com/settings/api) and make one. It's free and only mildly confusing.

Once you have your `Client ID` and `Client Secret`, create `tmp/env.sh`:

```sh
export STRAVA_CLIENT_ID=your_id_here
export STRAVA_CLIENT_SECRET=your_secret_here
```

Don't commit this file. It's in `.gitignore`. You're welcome.

### 2. Install Dependencies

```sh
bundle install
```

---

## Local Development

Run the local server:

```sh
./do-it
```

This sources your credentials and starts a WEBrick server on port 9090. WEBrick! Living on the edge.

The script will print a Strava OAuth URL. Open it in a browser, authorize the app, and Strava will redirect back to `localhost:9090/auth` where the server will:
1. Exchange the code for an access token
2. Fetch your latest rides
3. Update `rides.json`
4. Commit and push to `main` automatically

Yes, it commits and pushes from inside a running web request. We don't talk about that.

---

## Updating Ride Data

The `latest` Ruby script does the heavy lifting. It reads `rides.json` to find your most recent ride, then asks Strava for anything newer, converts units from metric to freedom units (m/s → mph, meters → miles), and appends the results.

If you want to inspect raw Strava data before it gets massaged:

```sh
cat new-rides.json | ./new-to-old.sh
```

This runs a `jq` one-liner that formats the fields you actually care about. Because raw Strava JSON is… a lot.

---

## Deployment

Pushing to `main` triggers a GitHub Actions workflow that deploys the whole repo as a GitHub Pages site. That's it. That's the whole pipeline.

```
git push origin main
# → GitHub Actions wakes up
# → Copies files to GitHub Pages
# → Robot is satisfied
```

---

## Tech Stack

| Thing | Why |
|---|---|
| HTML/JS | It's a website |
| [Chart.js](https://www.chartjs.org/) | Pretty charts without crying |
| [Moment.js](https://momentjs.com/) | Time is hard |
| [Hammer.js](https://hammerjs.github.io/) | Touch/pinch zoom on charts |
| Ruby | `serve.rb` and `latest` live here |
| [strava-ruby-client](https://github.com/dblock/strava-ruby-client) | Talks to Strava so you don't have to |
| WEBrick | Vintage vibes |
| GitHub Pages | Free hosting for your vanity metrics |

---

*Made with 🚴 and an unhealthy interest in self-quantification.*
