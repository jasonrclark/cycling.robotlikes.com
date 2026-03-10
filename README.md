# 🤖 Robot Likes Cycling

A robot built this website to track how much a human rides a bike. The robot does not ride bikes. The robot does not have legs. The robot is, however, deeply invested in whether you hit your mileage goals.

## What Is This?

It's [cycling.robotlikes.com](https://cycling.robotlikes.com) — a personal cycling stats dashboard that pulls ride data from Strava and displays it in a series of charts that say "yes, you rode your bike" or, more often, "you really should have ridden your bike."

Charts include:
- 📏 **Ride Distance** — How far did you go? (Bar chart, because every ride deserves a bar)
- 📈 **Total Distance** — The ever-growing pile of miles. Very satisfying. Until it isn't.
- 💨 **Average Speed** — Did you actually pedal, or just coast downhill the whole time?

Plus some vanity stats: max distance, average distance, total hours, total days. Yes, *days*. It converts hours to days, just to make you feel something.

## File Structure

```
.
├── index.html          # The cycling dashboard. The whole point.
├── walking.html        # For when the robot tracks walking too. Baby steps.
├── code.js             # JavaScript that makes the charts go brrr
├── rides.json          # Your ride data. The source of truth. Handle with care.
├── raw-rides.json      # Unprocessed ride data. Raw. Unfiltered. Emotionally unavailable.
├── new-rides.json      # Freshest rides, hot off the Strava
├── latest              # Ruby script that fetches new rides from Strava
├── serve.rb            # Local dev server that also handles Strava OAuth
├── do-it               # Shell script. You run this. It does it.
├── new-to-old.sh       # Migrates new rides into old format. A tale as old as time.
└── .github/workflows/  # GitHub Actions that auto-deploys to GitHub Pages on every push
```

## Setup

### Strava API Credentials

You'll need a Strava app. Go make one at [strava.com/settings/api](https://www.strava.com/settings/api). Name it something cool. Or something boring. Strava doesn't care.

Once you have credentials, create `tmp/env.sh` (not committed, for obvious reasons):

```sh
export STRAVA_CLIENT_ID=your_client_id_here
export STRAVA_CLIENT_SECRET=your_client_secret_here
```

### Install Dependencies

```sh
bundle install
```

This installs the Ruby gems. If you don't have `bundler`, that's a whole other problem.

## Local Development

```sh
./do-it
```

That's it. That's the command. The script sources your Strava credentials and starts a local WEBrick server on port 9090. It'll print a Strava OAuth URL. Visit it. Authorize. Watch new rides pour in. Feel briefly accomplished.

## Updating Ride Data

When Strava auth completes, the server automatically:
1. Fetches new rides since your last recorded ride
2. Converts speeds from m/s to mph (because freedom units)
3. Converts distances from meters to miles (see above)
4. Appends them to `rides.json`
5. Commits and pushes to `main`

The robot is watching. The robot is proud of you.

## Deployment

Push to `main`. GitHub Actions handles the rest, deploying to GitHub Pages automatically. The robot does not require your help. The robot has it covered.

## License

Ride your bike.
