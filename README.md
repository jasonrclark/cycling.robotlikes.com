# Robot Likes Cycling

A personal cycling and walking statistics visualization website that displays interactive charts and metrics from Strava activity data.

🚴 **Live Site**: [cycling.robotlikes.com](https://cycling.robotlikes.com)

## Features

- **Interactive Charts**: Visualize ride statistics over time with zoom and pan capabilities
- **Multiple Metrics**: Track distance, speed, duration, and cumulative totals
- **Dual Activities**: Separate pages for cycling and walking activities
- **Automatic Updates**: OAuth-based integration with Strava API for seamless data updates

## Prerequisites

- Ruby (with bundler)
- A Strava account and API application
- Strava API credentials (Client ID and Client Secret)

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
   - Go to [https://www.strava.com/settings/api](https://www.strava.com/settings/api)
   - Create a new application
   - Note your Client ID and Client Secret

## Usage

### Running the Development Server

Run the local development server:

```bash
./do-it
```

This will:
1. Load your Strava credentials from `tmp/env.sh`
2. Start a WEBrick server on port 9090
3. Display an authorization URL for Strava OAuth

### Updating Activity Data

1. Start the development server with `./do-it`
2. Open the authorization URL displayed in your browser
3. Authorize the application with Strava
4. The server will automatically:
   - Fetch new activities from Strava
   - Update `rides.json` with new data
   - Commit and push changes to the repository

### Viewing the Site

- **Cycling page**: Open `index.html` in your browser or visit the live site
- **Walking page**: Navigate to `walking.html`

## Project Structure

- `index.html` - Main cycling statistics page
- `walking.html` - Walking statistics page
- `code.js` - JavaScript for chart rendering and data visualization
- `rides.json` - Cycling activity data
- `walks.json` - Walking activity data
- `serve.rb` - Local development server with Strava OAuth
- `latest` - Script to fetch latest activities from Strava
- `do-it` - Convenience script to run the development server

## Technology Stack

- **Frontend**: HTML, JavaScript, Chart.js
- **Backend**: Ruby, WEBrick
- **API**: Strava API (via strava-ruby-client)
- **Visualization**: Chart.js with moment.js adapter and zoom plugin
- **Hosting**: GitHub Pages

## Charts and Metrics

The site displays the following visualizations:

### Cycling Page
- **Ride Distance**: Bar chart of individual ride distances
- **Total Distance**: Cumulative distance over time
- **Average Speed**: Scatter plot of average speed per ride
- **Statistics**: Max distance, average distance, total rides, total hours/days, average/max speed

### Walking Page
- Similar metrics and visualizations for walking activities

## Development

The site is deployed via GitHub Pages and updates automatically when changes are pushed to the main branch. Activity data is stored in JSON files (`rides.json` and `walks.json`) which are updated through the Strava OAuth flow.
