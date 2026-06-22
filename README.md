# cycling.robotlikes.com

A personal cycling stats site deployed at [cycling.robotlikes.com](https://cycling.robotlikes.com).

## What it does

Displays charts and summary stats for cycling rides (and walks) pulled from a local JSON data store. Charts are rendered with [Chart.js](https://www.chartjs.org/) and include:

- Per-ride distance
- Cumulative total distance over time
- Average speed per ride

## Files

| File | Purpose |
|------|---------|
| `index.html` | Cycling stats page |
| `walking.html` | Walking stats page |
| `rides.json` | Processed ride data |
| `walks.json` | Processed walk data |
| `code.js` | Shared chart/display logic |
| `new-rides.json` | Staging area for new ride entries |
| `raw-rides.json` | Raw ride data before processing |
| `new-to-old.sh` | Script to merge new rides into the main dataset |

## Local preview

```sh
ruby -rwebrick -e 'WEBrick::HTTPServer.new(:Port => 8000, :DocumentRoot => Dir.pwd).start'
```

Then open [http://localhost:8000](http://localhost:8000).

## Deployment

Pushes to `main` are automatically deployed to GitHub Pages via `.github/workflows/static.yml`.
