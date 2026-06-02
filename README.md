# cycling.robotlikes.com

Static files for [cycling.robotlikes.com](https://cycling.robotlikes.com), a small personal dashboard that charts cycling and walking activity from JSON data files.

## Local development

From the repository root, serve the files with a simple local web server:

```bash
ruby -rwebrick -e 'WEBrick::HTTPServer.new(:Port => 8000, :DocumentRoot => Dir.pwd).start'
```

Then open:

- `http://localhost:8000/index.html` for cycling charts
- `http://localhost:8000/walking.html` for walking charts

## Data updates

The repository includes Ruby scripts used to fetch/update ride data (`latest`, `serve.rb`) and expects Strava credentials in environment variables (`STRAVA_CLIENT_ID`, `STRAVA_CLIENT_SECRET`).

## Deployment

GitHub Actions deploys the repository as a static GitHub Pages site on pushes to `main` (`.github/workflows/static.yml`).
