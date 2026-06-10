# cycling.robotlikes.com

Static site and data files for https://cycling.robotlikes.com.

## What is in this repo

- `index.html` + `code.js`: cycling dashboard UI
- `walking.html`: walking dashboard UI
- `rides.json` / `walks.json`: activity datasets used by the dashboards
- `latest` and `serve.rb`: helper scripts for fetching updated ride data from Strava

## Local preview

From the repository root:

```bash
ruby -rwebrick -e 'WEBrick::HTTPServer.new(:Port => 8000, :DocumentRoot => Dir.pwd).start'
```

Then open http://localhost:8000.

## Updating ride data

`serve.rb` and `latest` rely on Strava credentials in environment variables, including:

- `STRAVA_CLIENT_ID`
- `STRAVA_CLIENT_SECRET`

After authentication, the scripts fetch new activities and update `rides.json`.
