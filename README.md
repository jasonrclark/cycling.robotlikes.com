# Robot Likes Cycling

A personal cycling and walking statistics visualization website that integrates with the Strava API to display your activity data through interactive charts.

## Overview

This project fetches cycling and walking activities from Strava and displays them in a web interface with various statistics and charts, including distance, speed, and time metrics.

## Features

- **Cycling Statistics**: View detailed cycling activity data with interactive charts
- **Walking Statistics**: Track walking activities separately
- **Strava Integration**: Automatic data sync from your Strava account
- **Interactive Charts**: Powered by Chart.js with zoom and pan capabilities
- **Historical Data**: Track your activities over time

## Prerequisites

- Ruby (for the local development server)
- Strava API credentials (Client ID and Client Secret)
- Bundler gem for managing Ruby dependencies

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
   
   Create a file `tmp/env.sh` with your Strava API credentials:
   ```bash
   export STRAVA_CLIENT_ID="your_client_id_here"
   export STRAVA_CLIENT_SECRET="your_client_secret_here"
   ```

   You can obtain these credentials by:
   - Going to https://www.strava.com/settings/api
   - Creating a new application if you haven't already
   - Copying the Client ID and Client Secret

4. **Run the development server**
   ```bash
   ./do-it
   ```

   This will start a local server and provide you with authorization URLs to connect your Strava account.

## Usage

Once the server is running:

1. Navigate to the authorization URL provided in the console
2. Grant access to your Strava data
3. The server will automatically fetch and update your activity data
4. View your statistics at `http://localhost:9090`

## Project Structure

- `index.html` - Cycling statistics page
- `walking.html` - Walking statistics page
- `code.js` - Client-side JavaScript for chart rendering
- `serve.rb` - Ruby server handling Strava OAuth and data fetching
- `do-it` - Convenience script to start the development server
- `latest` - Script to fetch latest activities from Strava
- `rides.json` - Cached cycling activity data
- `walks.json` - Cached walking activity data

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Charts**: Chart.js with zoom and moment.js adapter
- **Backend**: Ruby with WEBrick server
- **API**: Strava Ruby Client gem

## License

This is a personal project. Please contact the author for licensing questions.

## Author

Jason Clark
