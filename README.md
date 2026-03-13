# cycling.robotlikes.com

A static website that displays cycling (and walking) stats pulled from the [Strava](https://www.strava.com/) API, including ride distance, speed, and cumulative totals over time.

## Status

- **Live demo:** https://cycling.robotlikes.com

## Technologies

- HTML / JavaScript (primary — Chart.js, moment.js, chartjs-plugin-zoom)
- Ruby (Strava API integration via `strava-ruby-client`, local dev server via WEBrick)
- Shell scripts (data processing with `jq`)
- GitHub Pages (hosting)

## Quick Start

### 1. Clone the repo

```bash
git clone https://github.com/jasonrclark/cycling.robotlikes.com.git
cd cycling.robotlikes.com
```

### 2. Install Ruby dependencies

```bash
bundle install
```

### 3. Set up Strava credentials

Create a `tmp/env.sh` file with your Strava API credentials (this file is gitignored):

```bash
mkdir -p tmp
cat > tmp/env.sh <<'EOF'
export STRAVA_CLIENT_ID=your_client_id
export STRAVA_CLIENT_SECRET=your_client_secret
EOF
```

You can obtain credentials by creating an app at https://www.strava.com/settings/api.

### 4. View locally

To start the local WEBrick dev server and authenticate with Strava:

```bash
./do-it
```

This sources `tmp/env.sh` and starts `serve.rb` on port 9090. Open the OAuth URL printed to the console in your browser to authenticate and fetch the latest rides.

To serve the static files without Strava integration, you can also run:

```bash
ruby -rwebrick -e'WEBrick::HTTPServer.new(:Port => 8000, :DocumentRoot => Dir.pwd).start'
# then open http://localhost:8000
```

## Updating Ride Data

To fetch new rides from Strava and append them to `rides.json`, run the `latest` script with a valid Strava access token:

```bash
bundle exec ./latest <access_token>
```

The `do-it` / `serve.rb` flow handles OAuth automatically and calls `latest` after authentication.

If you have raw Strava activity JSON, use `new-to-old.sh` to transform it to the format used by the site:

```bash
jq -f new-to-old.sh new-rides.json
```

## Build / Deployment

This is a plain static site hosted on **GitHub Pages** with the custom domain `cycling.robotlikes.com` (configured via the `CNAME` file).

- Push changes to the `main` branch to deploy.
- `rides.json` and `walks.json` are the data files read by the browser at runtime — update and commit them to publish new stats.

## Project Structure

```
index.html        — Cycling stats page (charts: per-ride distance, total distance, average speed)
walking.html      — Walking stats page
code.js           — Shared frontend JavaScript (chart helpers, vanity stat rendering)
rides.json        — Cycling ride data (distance, duration, speed, date)
walks.json        — Walking activity data
serve.rb          — Local dev server with Strava OAuth flow (WEBrick, port 9090)
do-it             — Shell script to start the local dev server (sources tmp/env.sh)
latest            — Ruby script to fetch new Strava activities and append to rides.json
new-to-old.sh     — jq script to transform raw Strava JSON to the site's data format
Gemfile           — Ruby gem dependencies
CNAME             — GitHub Pages custom domain
favicon*.{png,ico}— Site favicons
```

## Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Make your changes and commit
4. Open a PR with a description of what you changed

## Testing

There is no automated test suite. To verify changes:

- Open `index.html` in a browser (or via the local server) and check that the charts render correctly with the existing `rides.json` data.
- After updating `rides.json`, confirm the vanity stats (max, average, totals) update as expected.

## License

No license file is currently present. If you intend to reuse this code, please contact the maintainer.

## Contact

- **Maintainer:** [jasonrclark](https://github.com/jasonrclark)
- **Issues:** Use [GitHub Issues](https://github.com/jasonrclark/cycling.robotlikes.com/issues) for bugs and feature requests.

## Notes / TODO

- Add a LICENSE file.
- Consider adding walking data update tooling similar to the cycling flow.
