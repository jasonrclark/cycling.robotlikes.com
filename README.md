# Robot Likes Cycling

A lightweight personal stats website that visualizes cycling and walking activity over time.  
The site renders charts and summary metrics directly in the browser from checked-in JSON data files.

## Technology Stack

- **HTML**: `index.html` and `walking.html` page layouts
- **JavaScript**: `code.js` chart/render helpers and client-side calculations
- **Ruby**: local servers and Strava data refresh scripts (`serve.rb`, `latest`)
- **Shell**: helper scripts (`do-it`, `new-to-old.sh`, `site`)
- **GitHub Actions**: deploys static content to GitHub Pages (`.github/workflows/static.yml`)
- **Libraries/CDNs**: Chart.js, Moment.js adapter, Hammer.js, chartjs-plugin-zoom, WEBrick, strava-ruby-client

## Setup Instructions

### Prerequisites

- Ruby (for local serving and data update scripts)
- Bundler (`gem install bundler`) for Ruby dependencies

### Run the site locally

From the repository root:

```bash
ruby -rwebrick -e 'WEBrick::HTTPServer.new(:Port => 8000, :DocumentRoot => Dir.pwd).start'
```

Then open:

- `http://localhost:8000/index.html` (cycling dashboard)
- `http://localhost:8000/walking.html` (walking dashboard)

### Optional: install Ruby dependencies

```bash
bundle install
```

## Project Structure

- `/index.html` – cycling dashboard page
- `/walking.html` – walking dashboard page
- `/code.js` – shared charting, sorting, tooltip, and vanity-stat helpers
- `/rides.json` – cycling activity dataset used by `index.html`
- `/walks.json` – walking dataset used by `walking.html`
- `/latest` – Ruby script that pulls newer Strava activities and updates `rides.json`
- `/serve.rb` – OAuth helper server for Strava token flow and update pipeline
- `/.github/workflows/static.yml` – GitHub Pages deployment workflow

## Usage

1. Start a local static server (see setup).
2. Visit `index.html` for cycling metrics:
   - ride distance chart
   - cumulative distance chart
   - average speed chart
   - summary stats (max, average, totals, count)
3. Use the walking icon/link to open `walking.html` for walking distance visualizations.
4. Drag-zoom on chart timelines (via chartjs-plugin-zoom).

## Development

- Front-end pages fetch local JSON files (`rides.json`, `walks.json`) at runtime.
- `latest` converts Strava API activity values to display units and appends new rides.
- `serve.rb` handles OAuth callback and can trigger ride updates/commit flow.
- The `main` branch is auto-deployed to GitHub Pages through Actions.
- This repository currently has no dedicated automated test suite.

## Contributing

Contributions are welcome. Recommended flow:

1. Fork the repository.
2. Create a feature branch.
3. Make focused changes and verify locally.
4. Open a pull request with a clear description.

## License

No `LICENSE` file is currently present in this repository.  
Unless/until a license is added by the owner, treat the code as not licensed for reuse.
