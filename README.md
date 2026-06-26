# cycling.robotlikes.com

Static site for visualizing cycling and walking activity data.

## Local preview

From the repository root, run:

```bash
ruby -rwebrick -e 'WEBrick::HTTPServer.new(:Port => 8000, :DocumentRoot => Dir.pwd).start'
```

Then open `http://localhost:8000`.

## Data files

- `rides.json`: cycling activity data used by `index.html`
- `walks.json`: walking activity data used by `walking.html`
- `code.js`: shared chart and metric rendering logic

## Deployment

GitHub Actions deploys the repository to GitHub Pages on pushes to `main` via `.github/workflows/static.yml`.
