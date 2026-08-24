# cycling.robotlikes.com

Static site files for [cycling.robotlikes.com](https://cycling.robotlikes.com), including:

- Cycling charts (`index.html`, `rides.json`)
- Walking charts (`walking.html`, `walks.json`)
- Shared chart helpers (`code.js`)

## Local development

1. Install Ruby dependencies:

   ```bash
   bundle install
   ```

2. Serve the site from the repo root:

   ```bash
   bundle exec ruby -run -e httpd . -p 8080
   ```

3. Open:

   - `http://localhost:8080/index.html`
   - `http://localhost:8080/walking.html`

## Updating ride data from Strava

The repo includes scripts for refreshing `rides.json` using Strava:

- `latest` fetches newer activities and appends normalized ride records
- `serve.rb` starts a local auth callback server and runs `latest`
- `do-it` runs `serve.rb` through Bundler

Required environment variables:

- `STRAVA_CLIENT_ID`
- `STRAVA_CLIENT_SECRET`

Example:

```bash
export STRAVA_CLIENT_ID=your_client_id
export STRAVA_CLIENT_SECRET=your_client_secret
```

Then run:

```bash
./do-it
```
