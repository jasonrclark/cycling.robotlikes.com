# cycling.robotlikes.com

A small static site and data repository used to publish ride and walk data for cycling.robotlikes.com.

## What this repo contains

- `index.html` — main site
- `code.js` — site JavaScript
- `walking.html` — walking-specific page
- `rides.json`, `raw-rides.json`, `new-rides.json` — ride data files (large JSON datasets)
- `walks.json` — walking data
- `serve.rb`, `Gemfile`, `Gemfile.lock` — small Ruby server and dependencies
- `CNAME` — custom domain for GitHub Pages
- favicons and other static assets

## Run locally

The site is static and can be viewed by opening `index.html` in a browser, but some features may require serving over HTTP. Two simple options:

1) Use a simple static HTTP server (Python 3)

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

2) If you prefer Ruby and `serve.rb` is present, try:

```bash
ruby serve.rb
# or, if it requires Bundler:
# bundle install
# ruby serve.rb
```

If `serve.rb` needs specific arguments or environment variables, update this README with them.

## Data files

This repository includes several large JSON data files (`rides.json`, `raw-rides.json`, `new-rides.json`, `walks.json`). They power the site's content and visualizations. If these are regenerated or replaced, keep the same filenames or update the site code accordingly. For large data updates, prefer adding a script that validates/ingests the data.

## Deployment

The presence of a `CNAME` file indicates the site is likely published via GitHub Pages to a custom domain. To publish changes, update the site files and push to the `main` branch (or the branch configured for Pages) and ensure Pages settings are correct.

## Contributing

- Open an issue describing the change or data update.
- Send a pull request with the modification; for large data updates, include a script that ingests/validates the data.

## License

Add a `LICENSE` file or update this section with the project license.

---
Notes: This change only adds documentation and does not modify existing code or data files. If maintainers prefer more specific run instructions for `serve.rb` or notes about how the JSON files are generated, I can update the README accordingly.
