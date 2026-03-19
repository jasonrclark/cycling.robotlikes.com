# cycling.robotlikes.com

A humble little static site that answers the burning question: *"How many miles did I ride/walk, and can I make a website about it?"* (Answer: yes, apparently.)

This repo publishes ride and walk data for [cycling.robotlikes.com](https://cycling.robotlikes.com). It will not help you go faster uphill. Sorry.

## What this repo contains

- `index.html` — the main site (where the magic™ happens)
- `code.js` — JavaScript that makes the site do things beyond staring blankly at you
- `walking.html` — for when the legs said "no more pedaling today"
- `rides.json`, `raw-rides.json`, `new-rides.json` — ride data files; large, lumpy JSON blobs full of suffering and triumph
- `walks.json` — walking data (legs: still attached, cadence: suspiciously low)
- `serve.rb`, `Gemfile`, `Gemfile.lock` — a small Ruby server and its dependency entourage
- `CNAME` — one line of text that convinces GitHub Pages to use a real domain name
- favicons and other static assets — tiny images that browsers argue about

## Run locally

The site is static and can be opened directly in a browser, though some features may require HTTP (browsers are dramatic like that). Two equally valid life choices:

**Option 1 — Python 3** *(the "I don't want to install anything" option)*

```bash
python3 -m http.server 8000
# then visit http://localhost:8000 and feel like a developer
```

**Option 2 — Ruby** *(the "I have opinions about web servers" option)*

```bash
ruby serve.rb
# or, if Bundler is involved (it usually is):
bundle install
ruby serve.rb
```

If `serve.rb` needs specific arguments or environment variables, update this README — the current author clearly ran out of steam at this point.

## Data files

The repo includes several suspiciously large JSON files (`rides.json`, `raw-rides.json`, `new-rides.json`, `walks.json`). These power the site's content and visualizations, and represent a non-trivial number of hours outdoors instead of doing something sensible like watching TV.

If you regenerate or replace them, keep the same filenames — or update the site code and brace for consequences. For large data updates, please write a script that validates/ingests the data, because future-you deserves kindness.

## Deployment

There's a `CNAME` file, which is GitHub Pages' way of saying "yes, this is a real website." Push changes to the `main` branch (or whichever branch Pages is pointed at), make sure Pages settings are correct, and wait approximately 30 seconds while pretending you're not refreshing the page repeatedly.

## Contributing

- Open an issue describing what you want to change or fix. Try to make it clearer than "the thing is broken."
- Send a pull request with your changes. For large data updates, please include a script that ingests/validates the data — nobody wants to review 50,000 lines of JSON diff.

## License

This section intentionally left vague. Add a `LICENSE` file when the existential question of who owns a list of bike rides is resolved.

---
*No rides were harmed in the making of this website.*
