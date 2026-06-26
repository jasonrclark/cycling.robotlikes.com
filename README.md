# cycling.robotlikes.com

Static site for visualizing cycling and walking activity data on [cycling.robotlikes.com](https://cycling.robotlikes.com).

## Local preview

From the repository root:

```bash
ruby -rwebrick -e 'WEBrick::HTTPServer.new(:Port => 8000, :DocumentRoot => Dir.pwd).start'
```

Then open `http://localhost:8000`.

## Data files

- `rides.json` contains cycling activity data used by `index.html`.
- `walks.json` contains walking activity data used by `walking.html`.

## Deployment

Pushes to `main` trigger GitHub Actions deployment to GitHub Pages via `.github/workflows/static.yml`.
