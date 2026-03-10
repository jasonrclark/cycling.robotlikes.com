# 🤖 cycling.robotlikes.com

A website where a robot obsessively tracks its human's cycling habits. The robot did not consent to being this person's accountability buddy, but here we are.

## What Is This?

It's a GitHub Pages site that pulls ride data from Strava and turns it into charts so you can feel either very proud or deeply ashamed of yourself, depending on the week.

Stats tracked include:
- 🚴 Per-ride distance (how far did you go today? probably not far enough)
- 📈 Cumulative total distance (the one chart that always goes up, unlike your motivation)
- 💨 Average and max speed (for bragging rights and/or explaining why your knees hurt)

There's also a [walking page](walking.html), for days when cycling feels like too much of a commitment.

## File Structure

```
.
├── index.html         # The cycling dashboard (where glory lives)
├── walking.html       # The walking dashboard (where excuses live)
├── code.js            # Chart rendering magic
├── rides.json         # Your permanent record of cycling shame and triumph
├── walks.json         # See above, but slower
├── serve.rb           # Local dev server + Strava OAuth wrangler
├── latest             # Ruby script that fetches new rides from Strava
├── new-to-old.sh      # Inspect raw Strava JSON when you don't trust the robot
├── do-it              # The script. Just do it.
└── Gemfile            # Ruby dependencies (the robot needs its gems)
```

## Setup

### 1. Get Strava API Credentials

Go to [strava.com/settings/api](https://www.strava.com/settings/api) and create an app. Name it whatever you want — the robot won't judge.

You'll get a **Client ID** and **Client Secret**. Treasure them.

### 2. Configure Your Secrets

Create `tmp/env.sh` (this file is gitignored, so your secrets stay secret):

```bash
export STRAVA_CLIENT_ID=your_client_id_here
export STRAVA_CLIENT_SECRET=your_client_secret_here
```

### 3. Install Dependencies

```bash
bundle install
```

## Updating Your Ride Data

Run the local server, which will also handle the Strava OAuth dance:

```bash
./do-it
```

This starts a WEBrick server on port 9090 and spits out a Strava authorization URL. Open that URL in your browser, approve access, and the robot will automatically:

1. Fetch your newest rides from Strava
2. Append them to `rides.json`
3. Commit and push to `main`

You don't have to do anything except click a link. Which is appropriate, because you just finished a ride and your legs hurt.

> **Running in GitHub Codespaces?** It works there too. The server auto-detects the Codespaces forwarding domain so OAuth redirects land correctly.

## Local Development

After running `./do-it` and completing auth, the site is served at [http://localhost:9090](http://localhost:9090). Open it, marvel at your charts, tell yourself you'll ride more next week.

## Deployment

The site is hosted on GitHub Pages. Once `rides.json` is updated and pushed to `main`, the charts on [cycling.robotlikes.com](https://cycling.robotlikes.com) update automatically. No build step. No CI pipeline. Just JSON and vibes.

## FAQ

**Q: Why does this exist?**
A: The robot wanted data. The human wanted charts. Strava had an API. It was destiny.

**Q: Can I use this for my own cycling data?**
A: Theoretically yes. Practically, you'll need to replace the Strava credentials, clear out `rides.json`, and confront how few miles you've actually biked this year.

**Q: What if I want to see my walking stats?**
A: [walking.html](walking.html) has you covered. The robot doesn't judge your pace.
