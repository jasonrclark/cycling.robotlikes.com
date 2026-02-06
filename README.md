# Robot Likes Cycling

A personal cycling and walking statistics visualization website that displays interactive charts of activities from the Strava API.

## Overview

This project fetches cycling and walking activity data from Strava and visualizes it using Chart.js. The site displays various statistics including:

- **Per-ride distance**: Individual ride distances over time
- **Total distance**: Cumulative distance over time
- **Average speed**: Speed trends across activities
- **Vanity metrics**: Max/average distances, total hours, total days, and ride counts

## Live Site

Visit [cycling.robotlikes.com](https://cycling.robotlikes.com) to see the live visualization.

## Technologies Used

- **Frontend**: HTML, JavaScript, Chart.js
- **Backend**: Ruby with WEBrick server
- **Data Source**: Strava API (via strava-ruby-client gem)
- **Hosting**: GitHub Pages (static site)

## Prerequisites

- Ruby (with Bundler)
- Strava API credentials (Client ID and Client Secret)
- A Strava account with activity data

## Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/jasonrclark/cycling.robotlikes.com.git
   cd cycling.robotlikes.com
   ```

2. **Install dependencies**:
   ```bash
   bundle install
   ```

3. **Configure Strava API credentials**:
   Create a file at `tmp/env.sh` with your Strava API credentials:
   ```bash
   export STRAVA_CLIENT_ID="your_client_id"
   export STRAVA_CLIENT_SECRET="your_client_secret"
   ```

   To get Strava API credentials:
   - Go to [Strava API Settings](https://www.strava.com/settings/api)
   - Create an application
   - Copy the Client ID and Client Secret

## Usage

### Local Development

Run the local development server:
```bash
./do-it
```

This script:
1. Sources the environment variables from `tmp/env.sh`
2. Starts a WEBrick server on port 9090
3. Handles Strava OAuth authentication
4. Provides URLs for authorization

### Fetching New Activity Data

The `serve.rb` script includes an OAuth flow that:
1. Authenticates with Strava
2. Fetches new activities using the `latest` script
3. Updates `rides.json` with new data
4. Automatically commits and pushes changes to the repository

### Manual Activity Updates

You can also manually update activities using the `latest` script with an access token:
```bash
./latest YOUR_ACCESS_TOKEN
```

## Project Structure

- **`index.html`**: Main cycling statistics page
- **`walking.html`**: Walking statistics page
- **`code.js`**: JavaScript utilities for chart rendering
- **`serve.rb`**: Ruby server for OAuth authentication and data updates
- **`do-it`**: Development server startup script
- **`latest`**: Ruby script to fetch latest activities from Strava
- **`rides.json`**: Cached cycling activity data
- **`walks.json`**: Cached walking activity data

## Data Files

- **`rides.json`**: Contains cycling activity data with fields like distance, duration, ride_date, average_speed, max_speed
- **`walks.json`**: Contains walking activity data with similar structure
- **`raw-rides.json`**: Raw data from Strava API
- **`new-rides.json`**: Newly fetched activities before merging

## Chart Features

The interactive charts support:
- **Time-based x-axis**: Activities plotted chronologically
- **Zoom functionality**: Drag to zoom on specific time periods (powered by chartjs-plugin-zoom)
- **Tooltips**: Hover over data points to see detailed information
- **Multiple chart types**: Bar charts for individual rides, scatter plots for trends

## License

This is a personal project. Please contact the repository owner for usage permissions.

## Author

Jason Clark - [jasonrclark.com](https://jasonrclark.com)
