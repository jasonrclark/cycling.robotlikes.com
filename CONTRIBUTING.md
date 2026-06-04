# Contributing

Thanks for contributing to `cycling.robotlikes.com`.

## Project overview

This repository hosts a static site that visualizes cycling and walking activity data.

## Repository layout

- `index.html` / `walking.html` — site pages
- `code.js` — shared charting and UI logic
- `rides.json` / `walks.json` — activity data consumed by the site
- `new-to-old.sh`, `serve.rb`, `latest` — helper scripts for data updates and local workflows

## Local setup

1. Install Ruby dependencies:
   ```bash
   bundle install
   ```
2. Preview the site from the repository root:
   ```bash
   ruby -rwebrick -e 'WEBrick::HTTPServer.new(:Port => 8000, :DocumentRoot => Dir.pwd).start'
   ```
3. Open `http://localhost:8000`.

## Making changes

- Keep changes focused and small.
- Prefer clear, readable updates over large refactors.
- When updating data files, ensure JSON remains valid and consistently formatted.

## Validation

Before opening a pull request:

- Verify Ruby script syntax for touched scripts, for example:
  ```bash
  ruby -c serve.rb
  ```
- Manually load the site locally and confirm affected pages/charts still render.

## Pull requests

- Use a concise title and include a short summary of what changed and why.
- Link related issues if applicable.
- Include screenshots or short notes for visible UI changes.
- Confirm what you validated locally.
