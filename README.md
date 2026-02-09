# Robot Likes Cycling

A personal cycling and walking statistics visualization website using Strava API data.

## Overview

This project displays cycling and walking activity statistics from Strava, including distance, elevation, and time metrics with interactive charts. The site is hosted at [cycling.robotlikes.com](https://cycling.robotlikes.com).

## Prerequisites

- Ruby (with bundler)
- A Strava API application (for fetching activity data)
- Git (for deployment)

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/jasonrclark/cycling.robotlikes.com.git
   cd cycling.robotlikes.com
   ```

2. Install dependencies:
   ```bash
   bundle install
   ```

3. Create Strava API credentials:
   - Go to [Strava API Settings](https://www.strava.com/settings/api)
   - Create a new application
   - Note your Client ID and Client Secret

4. Configure environment variables:
   Create a file at `tmp/env.sh` with your Strava credentials:
   ```bash
   export STRAVA_CLIENT_ID="your_client_id"
   export STRAVA_CLIENT_SECRET="your_client_secret"
   ```

## Running Locally

Start the local development server:

```bash
./do-it
```

This script will:
1. Source your Strava credentials from `tmp/env.sh`
2. Start a local web server on port 9090
3. Display an authorization URL in the console

Visit the authorization URL in your browser to authenticate with Strava and fetch the latest activity data.

## Project Structure

- `index.html` - Main cycling statistics page
- `walking.html` - Walking statistics page
- `code.js` - JavaScript for rendering charts and statistics
- `serve.rb` - Ruby web server for OAuth flow and data fetching
- `do-it` - Shell script to start the local development server
- `latest` - Script to fetch latest activities from Strava
- `rides.json` / `walks.json` - Cached activity data
- `CNAME` - Custom domain configuration for GitHub Pages

## Technologies Used

- **Frontend**: HTML, JavaScript, Chart.js
- **Backend**: Ruby, WEBrick
- **API**: Strava Ruby Client
- **Hosting**: GitHub Pages

## License

Personal project by Jason Clark.
