# cycling.robotlikes.com

A robot likes cycling. A robot also likes walking, apparently, though it complains less about hills. This is that robot's personal vanity stats website, hosted at [cycling.robotlikes.com](https://cycling.robotlikes.com), where it stares at its own numbers and feels things.

Activity data is ripped straight from Strava and rendered as interactive charts using Chart.js. The robot finds this very satisfying.

## What's On The Site

- **Cycling page** (`index.html`): How far did I go? How fast? How many times? Charts! Numbers! Existential validation!
- **Walking page** (`walking.html`): Slower. Fewer gears. Still counts.

## File Structure

```
├── index.html          # Cycling stats (the robot's proudest achievement)
├── walking.html        # Walking stats (the robot's humbler achievement)
├── code.js             # Shared charting logic, because DRY even for vanity projects
├── rides.json          # Every bike ride, immortalized in JSON
├── walks.json          # Every walk, also immortalized (walks deserve love too)
├── serve.rb            # Local dev server + Strava OAuth wrangler
├── do-it               # Shell script named with the energy of someone who just wants to get going
├── latest              # Fetches new rides from Strava (the robot's favorite script)
├── new-to-old.sh       # Utility for poking at raw Strava JSON
├── new-rides.json      # Freshly fetched activities, still warm
├── raw-rides.json      # Unprocessed Strava data, straight from the source
├── Gemfile             # Ruby gem manifest (gems: not the fun kind)
├── CNAME               # Tells GitHub Pages where this robot lives on the internet
└── .github/workflows/
    └── static.yml      # Auto-deploys on push, because the robot is lazy (efficient)
```

## Strava API Setup

The robot needs credentials before it can talk to Strava. Strava is protective of its data, which is fair.

1. Create a Strava API application at [strava.com/settings/api](https://www.strava.com/settings/api). Name it something cool.
2. Create a `tmp/env.sh` file (this is intentionally gitignored — don't commit your secrets, that's how robots get hacked) with your credentials:

```sh
export STRAVA_CLIENT_ID=your_client_id
export STRAVA_CLIENT_SECRET=your_client_secret
```

## Local Development

First, summon the Ruby dependencies:

```sh
bundle install
```

Then, simply:

```sh
./do-it
```

The script sources `tmp/env.sh`, fires up a WEBrick server on port 9090, and kicks off the Strava OAuth flow. Open the printed URL in a browser, grant Strava permission to share your suffering, and it'll redirect back to `/auth`. From there, new activities are fetched, `rides.json` is updated, and the changes are committed and pushed automatically.

Running in a GitHub Codespace? The redirect URL auto-adjusts to the forwarded port. The robot thought of everything.

## Updating Activity Data

If you just want to pull new rides without the full OAuth dance (e.g., you already have an access token):

```sh
bundle exec ./latest <access_token>
```

This finds the most recent ride in `rides.json`, asks Strava for anything newer, and appends the results. Efficient. Relentless. Just like the robot.

## Deployment

Push to `main` and the GitHub Actions workflow in `.github/workflows/static.yml` takes it from there — the whole repo gets deployed as a static site to [cycling.robotlikes.com](https://cycling.robotlikes.com). No build step, no nonsense. The robot appreciates simplicity.
