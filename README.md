# 🤖 Robot Likes Cycling

> A website where a robot obsessively tracks how far a human pedals and walks, then judges them with charts.

## What Is This?

This is a personal fitness stats site powered by [Strava](https://www.strava.com/). It pulls cycling and walking activity data from Strava and displays it as beautiful, interactive charts — so you can stare at evidence of your own mediocrity in graph form.

Two thrilling pages await you:

- **Cycling** (`index.html`) — Bar charts! Scatter plots! Speed stats! Did you really average 12 mph? The robot has noted this.
- **Walking** (`walking.html`) — Because sometimes the bike is sad and you use your legs like a regular mammal.

## Setup

The robot needs credentials to spy on your Strava account. Create `tmp/env.sh` (which is gitignored, so your secrets stay secret):

```sh
mkdir -p tmp
cat > tmp/env.sh <<EOF
export STRAVA_CLIENT_ID=your_client_id_here
export STRAVA_CLIENT_SECRET=your_client_secret_here
EOF
```

You can get these from [Strava's API settings](https://www.strava.com/settings/api). Tell them a robot sent you.

Then install the Ruby dependencies:

```sh
bundle install
```

## Fetching New Rides

To pull fresh data from Strava and update `rides.json`, run the local server:

```sh
./do-it
```

This starts a WEBrick server on port 9090 and prints a Strava OAuth authorization URL. Visit that URL, approve access, and Strava will redirect back to the local server. The robot will then:

1. Exchange the OAuth code for an access token
2. Fetch any new activities since the last recorded ride
3. Append them to `rides.json` with distances converted to miles and speeds to mph (because freedom units)
4. Commit and push the update to `main` automatically

Yes, the server commits to git. The robot is very self-sufficient.

> **Note:** If you're running inside a GitHub Codespace, the server automatically uses the Codespace's public forwarding URL instead of `localhost`. The robot is also cloud-native.

## Project Structure

```
.
├── index.html        # Cycling stats page
├── walking.html      # Walking stats page
├── code.js           # Chart rendering and vanity stat logic
├── rides.json        # All cycling activity data (the robot's diary)
├── walks.json        # All walking activity data (a thinner diary)
├── raw-rides.json    # Raw Strava API data, unfiltered and unashamed
├── new-rides.json    # Staging area for freshly fetched rides
├── serve.rb          # OAuth server + data fetcher + accidental CI system
├── latest            # Ruby script to fetch new activities from Strava
├── new-to-old.sh     # jq one-liner to inspect raw ride data
├── do-it             # Convenience script: sources env and runs serve.rb
├── Gemfile           # Ruby dependencies
└── CNAME             # Points to cycling.robotlikes.com
```

## Tech Stack

- **Ruby** — WEBrick server handles the Strava OAuth dance
- **strava-ruby-client** / **strava-ruby-cli** — because rolling your own Strava client sounds exhausting
- **Chart.js** — renders the charts that make your efforts look vaguely impressive
- **moment.js** — for time-based axes, because dates are hard
- **chartjs-plugin-zoom** — lets you drag-zoom charts to pretend you're analyzing data professionally
- **Hammer.js** — touch support, for when you need to feel bad about your speed on mobile

## Contributing

It's a personal stats site for one human, tracked by one robot. Unless you are that human, contributions are gently but firmly unnecessary. PRs will be evaluated by the robot and found wanting.

## License

Unlicensed. The robot owns everything.
