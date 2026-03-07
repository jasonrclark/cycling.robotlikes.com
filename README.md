# cycling.robotlikes.com

A website where a robot carefully tracks every mile ridden on a bicycle, because apparently that's what robots do in their spare time. Data is pulled from Strava, massaged into JSON, and displayed as charts so the robot can feel good (or bad) about its fitness choices.

Also has a walking page, for the days when the robot's legs hurt.

Live site: [cycling.robotlikes.com](https://cycling.robotlikes.com)

## What It Does

- Fetches cycling (and walking) activity data from Strava
- Stores it in flat JSON files, because databases are for people with more ambition
- Renders interactive charts via Chart.js so you can zoom in on that one embarrassingly short ride
- Displays vanity stats like total miles, average speed, and how many days of your life you've spent on a bike seat

## File Structure

```
index.html       # Cycling charts page
walking.html     # Walking charts page (the robot's off days)
code.js          # Chart rendering logic shared between pages
rides.json       # All the cycling data. Guard it with your life.
walks.json       # All the walking data.
raw-rides.json   # Raw Strava API output, unfiltered and unashamed
new-rides.json   # Staging area for rides not yet processed
serve.rb         # Local dev server + Strava OAuth handler
latest           # Ruby script that fetches new rides from Strava
new-to-old.sh    # Helper to inspect raw ride data with jq
do-it            # Heroically named shell script to start the server
Gemfile          # Ruby dependencies
CNAME            # Tells GitHub Pages what domain to use
```

## Setup

You'll need Ruby and Bundler installed. Then:

```bash
bundle install
```

You'll also need a Strava API application. Go to [strava.com/settings/api](https://www.strava.com/settings/api), create one, and note down your **Client ID** and **Client Secret**. Strava will ask what your app does. "Tracking my own rides for charts" is a perfectly acceptable answer.

Create `tmp/env.sh` (the `tmp/` directory is gitignored, keeping your secrets secret):

```bash
export STRAVA_CLIENT_ID=your_client_id_here
export STRAVA_CLIENT_SECRET=your_client_secret_here
```

> ⚠️ **Security note:** `tmp/` is in `.gitignore` for a reason. Do not commit `tmp/env.sh` or put your Strava credentials anywhere else in the repo. The Strava API will let you revoke tokens if something goes wrong, but "I accidentally pushed my secret to GitHub" is a much less fun story to tell than "I rode 40 miles on a Tuesday."

## Running Locally

```bash
./do-it
```

That's it. The server starts on port 9090 and prints a Strava OAuth URL to the terminal. Open that URL in a browser, authorize the app, and Strava will redirect back to the local server which will fetch your latest rides and commit the updated `rides.json` automatically. Yes, it commits from inside the server handler. We don't judge.

If you're running in a GitHub Codespace, the redirect URL is automatically adjusted to the forwarded port URL. The robot thought of everything.

## Updating Ride Data

The OAuth flow above handles it automatically. When Strava redirects to `/auth`, `serve.rb` exchanges the code for an access token, passes it to the `latest` script, which fetches all activities newer than the most recent ride in `rides.json`, converts units from metric (because Strava is European at heart), and appends them to the file.

To inspect raw Strava data before it's processed, you can run:

```bash
./new-to-old.sh
```

This pipes `new-rides.json` through `jq` to show the relevant fields. Useful for debugging, or just for marveling at how many fields Strava tracks about your commute.

## Deployment

The site is hosted on GitHub Pages. Push to `main`, GitHub does the rest. The `CNAME` file points the custom domain at the right place. That's the whole deployment pipeline. It's beautiful in its simplicity.
