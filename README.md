# 🚴 cycling.robotlikes.com

A website where a robot tracks its human's cycling (and walking) obsession so the human doesn't have to look at Strava directly like some kind of animal.

Live at: [cycling.robotlikes.com](https://cycling.robotlikes.com)

---

## What Is This?

It's a personal cycling stats dashboard. It pulls ride data from [Strava](https://www.strava.com/), shoves it into a JSON file, and renders pretty charts so you can stare at evidence of how fast (or slow) you went and feel things about it.

Features include:
- 📊 Per-ride distance chart (bar chart, very serious)
- 📈 Cumulative total distance over time (great for feeling smug)
- 💨 Average speed over time (great for feeling humbled)
- 🚶 A separate walking page, for the dark days

---

## Prerequisites

You will need:
- Ruby (because someone made a bet and lost)
- Bundler (`gem install bundler`)
- A [Strava API application](https://www.strava.com/settings/api) — free, takes 2 minutes, requires you to explain your "app" to Strava as if you have a real product
- A Strava account full of rides you definitely meant to do

---

## Setup

### 1. Install dependencies

```bash
bundle install
```

### 2. Configure Strava credentials

Create `tmp/env.sh` with your Strava app's credentials:

```bash
export STRAVA_CLIENT_ID=your_client_id_here
export STRAVA_CLIENT_SECRET=your_secret_here
```

Don't commit this file. It's in `.gitignore`. You're welcome.

---

## Local Development

```bash
./do-it
```

Yes, the script is called `do-it`. It sources your credentials and starts a local server at `http://localhost:9090`. It also opens the Strava OAuth URL in your terminal so you can authorize the app and pull in new rides.

> Works in GitHub Codespaces too, because the future is weird.

---

## Updating Ride Data

Once you authenticate via the OAuth flow, the server will automatically:
1. Fetch any new rides from Strava since your last update
2. Convert them from metric (gross) to miles/mph (obviously correct)
3. Append them to `rides.json`
4. Commit and push to `main`

All of this happens in a single browser redirect. Magic, or at least a reasonable facsimile.

---

## Deployment

The site is hosted on [GitHub Pages](https://pages.github.com/). Pushing to `main` is all it takes. No build step, no bundler, no crying.

---

## File Structure

```
.
├── index.html        # Cycling dashboard
├── walking.html      # Walking dashboard (for rest days and self-reflection)
├── code.js           # Chart rendering and vanity stat logic
├── rides.json        # Your ride history (the receipts)
├── walks.json        # Walk history (fewer receipts)
├── serve.rb          # Local dev server + Strava OAuth handler
├── latest            # Ruby script that fetches new rides from Strava
├── new-to-old.sh     # jq one-liner for inspecting raw Strava data
├── do-it             # Entry point. Just run it.
├── Gemfile           # Ruby dependencies
└── CNAME             # Points GitHub Pages at the real domain
```

---

## FAQ

**Why not just use the Strava website?**
The Strava website has opinions about your data. This website has *your* opinions about your data.

**Why Ruby?**
No good reason. It was there.

**Why is there a walking page?**
Legs get tired. Judgment does not.

**Can I use this for my own rides?**
Sure! Fork it, swap in your Strava credentials, update the CNAME, and go nuts. Or just go outside and ride a bike, honestly.
