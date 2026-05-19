# cycling.robotlikes.com

Static site files for [cycling.robotlikes.com](https://cycling.robotlikes.com), with ride and walking data visualizations.

## Local preview

From the repository root, run:

```bash
ruby -rwebrick -e 'WEBrick::HTTPServer.new(:Port => 8000, :DocumentRoot => Dir.pwd).start'
```

Then open <http://localhost:8000>.

## Data files

- `rides.json` — cycling ride dataset used by the main page
- `walks.json` — walking dataset used by `walking.html`
