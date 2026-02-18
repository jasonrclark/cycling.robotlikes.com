# Robot Likes Cycling

A personal cycling and walking statistics visualization website that displays activity data from Strava. Live at [cycling.robotlikes.com](https://cycling.robotlikes.com).

## Overview

This project creates interactive charts and statistics from your Strava cycling and walking activities. It features:

- **Cycling statistics**: Distance per ride, total distance over time, and average speed tracking
- **Walking statistics**: Distance per walk and total distance over time
- **Interactive charts**: Drag to zoom functionality powered by Chart.js
- **Automatic updates**: OAuth-based workflow to fetch and commit new activities from Strava

## Setup

### Prerequisites

- Ruby (with Bundler)
- Strava API credentials (Client ID and Client Secret)

### Installation

1. Install dependencies:
   ```bash
   bundle install
   ```

2. Create a `tmp/env.sh` file with your Strava API credentials:
   ```bash
   export STRAVA_CLIENT_ID="your_client_id"
   export STRAVA_CLIENT_SECRET="your_client_secret"
   ```

3. Get your Strava API credentials from [Strava API Settings](https://www.strava.com/settings/api)

## Usage

### Running Locally

Start the local development server:

```bash
./do-it
```

This will:
- Source your Strava credentials from `tmp/env.sh`
- Start a WEBrick server on port 9090
- Print OAuth authorization URLs

### Updating Activities

1. Visit the OAuth authorization URL printed by the server
2. Authorize the application with Strava
3. The server will fetch new activities and update `rides.json`
4. Changes are automatically committed and pushed to the main branch

## Project Structure

- `index.html` - Main page displaying cycling statistics
- `walking.html` - Page displaying walking statistics
- `code.js` - JavaScript functions for charts and data visualization
- `serve.rb` - Ruby WEBrick server with Strava OAuth handling
- `latest` - Ruby script to fetch latest activities from Strava
- `rides.json` - Stored cycling activity data
- `walks.json` - Stored walking activity data
- `do-it` - Helper script to start the development server

## Technical Details

### Frontend

- **Chart.js 3.9.1**: Interactive charts with zoom support
- **Moment.js**: Time scale handling
- **Hammer.js**: Touch/gesture support for zooming

### Backend

- **Ruby WEBrick**: Simple HTTP server for local development
- **strava-ruby-client**: Strava API OAuth and data fetching
- **strava-ruby-cli**: Command-line interface for Strava API

### Data Format

Activity data is stored in JSON format with the following structure:

```json
{
  "strava_id": 123456789,
  "ride_date": "2024-01-01",
  "duration": 3600,
  "average_speed": 15.5,
  "max_speed": 25.3,
  "created_at": "2024-01-01 10:00:00",
  "where_to": "Morning Ride",
  "distance": 10.5
}
```

## License

Personal project by Jason Clark
