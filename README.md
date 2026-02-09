# Robot Likes Cycling

A personal cycling and walking statistics visualization website that displays interactive charts of activity data fetched from the Strava API.

Live at: [cycling.robotlikes.com](https://cycling.robotlikes.com)

## Features

- **Cycling Statistics**: Visualize ride distance, total distance over time, and average speed
- **Walking Statistics**: Track walking distance and cumulative totals
- **Interactive Charts**: Zoom and pan through your activity history using Chart.js
- **Strava Integration**: Automatically fetch and update activities from your Strava account

## Prerequisites

- Ruby (for running the local development server)
- Bundler
- A Strava account and API application credentials

## Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/jasonrclark/cycling.robotlikes.com.git
   cd cycling.robotlikes.com
   ```

2. **Install dependencies**
   ```bash
   bundle install
   ```

3. **Configure Strava API credentials**
   
   Create a file at `tmp/env.sh` with your Strava API credentials:
   ```bash
   export STRAVA_CLIENT_ID="your_client_id"
   export STRAVA_CLIENT_SECRET="your_client_secret"
   ```

   To get Strava API credentials:
   - Go to https://www.strava.com/settings/api
   - Create a new application
   - Copy the Client ID and Client Secret

4. **Run the local development server**
   ```bash
   ./do-it
   ```

   This will:
   - Source your Strava credentials from `tmp/env.sh`
   - Start a WEBrick server on port 9090
   - Display authorization URLs for OAuth authentication

## Usage

### Viewing Statistics Locally

1. Start the development server with `./do-it`
2. Open your browser to `http://localhost:9090`
3. View cycling statistics on the main page
4. Click the walking icon (🚶) to view walking statistics

### Updating Activity Data

The `serve.rb` script provides an OAuth flow for fetching new activities:

1. Run `./do-it` to start the server
2. Follow the authorization URL displayed in the console
3. Authorize the application with Strava
4. New activities will be fetched and added to `rides.json`
5. Changes will be automatically committed and pushed

### Manual Activity Updates

You can also manually fetch new activities using the `latest` script:

```bash
bundle exec ./latest <access_token>
```

This will:
- Fetch activities created after the last recorded ride
- Update `rides.json` with the new data
- Convert Strava metrics (meters to miles for cycling, speed units)

## Project Structure

- `index.html` - Main cycling statistics page
- `walking.html` - Walking statistics page
- `code.js` - Chart rendering and data processing functions
- `serve.rb` - Local development server with OAuth authentication
- `do-it` - Script to start the development server
- `latest` - Script to fetch new activities from Strava
- `rides.json` - Cycling activity data
- `walks.json` - Walking activity data
- `raw-rides.json` - Raw activity data from Strava
- `new-rides.json` - Newly fetched activities

## Technologies

- **Frontend**: HTML, JavaScript, Chart.js
- **Charts**: Chart.js with moment.js for time scales and Hammer.js for zoom/pan
- **Backend**: Ruby with WEBrick for local development
- **API**: Strava API via strava-ruby-client gem
- **Hosting**: GitHub Pages (static site)

## Data Format

Activity data in `rides.json` follows this structure:

```json
{
  "strava_id": 12345,
  "ride_date": "2024-01-01",
  "duration": 3600,
  "average_speed": 15.5,
  "max_speed": 28.3,
  "created_at": "2024-01-01T10:00:00Z",
  "where_to": "Morning Ride",
  "distance": 20.5
}
```

- Distances are in miles for cycling, kilometers for walking
- Speeds are in mph for cycling
- Duration is in seconds

## License

This is a personal project. All rights reserved.
