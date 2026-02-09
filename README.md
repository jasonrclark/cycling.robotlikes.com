# Robot Likes Cycling

A personal cycling and walking statistics visualization website that displays activity data from Strava. The site provides interactive charts showing distance, speed, and other metrics over time.

🚴 **Live Site**: [cycling.robotlikes.com](https://cycling.robotlikes.com)

## Features

- **Cycling Statistics**: View your cycling activities with interactive charts
  - Distance per ride over time
  - Average and max speed tracking
  - Total distance and average speed metrics
- **Walking Statistics**: Separate page for walking activities
- **Interactive Charts**: Zoom and pan through your activity history using Chart.js
- **Strava Integration**: Automatic data synchronization from Strava API

## Project Structure

```
.
├── index.html          # Main cycling statistics page
├── walking.html        # Walking statistics page
├── code.js            # JavaScript for charts and data visualization
├── rides.json         # Cycling activity data
├── walks.json         # Walking activity data
├── serve.rb           # Ruby web server with OAuth flow for Strava
├── latest             # Ruby script to fetch latest activities from Strava
├── do-it              # Convenience script to run local development server
├── Gemfile            # Ruby dependencies
└── site/              # Additional site resources
```

## Prerequisites

- Ruby (with bundler)
- A Strava API application (for fetching activity data)
  - Client ID
  - Client Secret

## Setup

### 1. Install Dependencies

```bash
bundle install
```

### 2. Configure Strava API Credentials

Create a file at `tmp/env.sh` with your Strava API credentials:

```bash
export STRAVA_CLIENT_ID="your_client_id_here"
export STRAVA_CLIENT_SECRET="your_client_secret_here"
```

To get these credentials:
1. Go to [Strava API Settings](https://www.strava.com/settings/api)
2. Create an application if you haven't already
3. Copy your Client ID and Client Secret

### 3. Set Authorization Callback Domain

In your Strava API application settings, add your callback URL:
- For local development: `http://localhost:9090/auth`
- For Codespaces: The script will automatically generate the URL

## Usage

### Running the Local Development Server

```bash
./do-it
```

This will:
1. Source your environment variables from `tmp/env.sh`
2. Start a web server on port 9090
3. Display the OAuth authorization URL

### Updating Activity Data

1. Run the `./do-it` script
2. Visit the authorization URL printed in the console
3. Authorize the application with Strava
4. The server will automatically:
   - Fetch new activities since the last update
   - Update `rides.json` with new cycling data
   - Commit and push changes to the repository

### Viewing the Site Locally

After starting the server, navigate to:
- Cycling: `http://localhost:9090/`
- Walking: `http://localhost:9090/walking.html`

## How It Works

### Data Flow

1. **Authorization**: The `serve.rb` server initiates Strava OAuth flow
2. **Fetching**: The `latest` script retrieves new activities via Strava API
3. **Processing**: Activities are converted from metric to imperial units and formatted
4. **Storage**: Data is saved to `rides.json` and `walks.json`
5. **Visualization**: HTML pages load JSON data and render charts using Chart.js

### Data Format

Activity data in `rides.json` and `walks.json` includes:
- `ride_date`/`walk_date`: Activity date
- `distance`: Distance in miles
- `duration`: Duration in seconds
- `average_speed`: Average speed in mph
- `max_speed`: Maximum speed in mph
- `where_to`: Activity name/description
- `strava_id`: Strava activity ID

## Technologies Used

- **Frontend**: 
  - HTML/CSS/JavaScript
  - [Chart.js](https://www.chartjs.org/) for data visualization
  - [Moment.js](https://momentjs.com/) for time handling
  - [chartjs-plugin-zoom](https://github.com/chartjs/chartjs-plugin-zoom) for interactive charts
  - [Hammer.js](https://hammerjs.github.io/) for touch gestures

- **Backend**:
  - Ruby with WEBrick server
  - [strava-ruby-client](https://github.com/dblock/strava-ruby-client) for Strava API integration

## Development Notes

- The site uses imperial units (miles, mph) by default
- Data is stored in JSON files and committed to the repository
- The `latest` script only fetches activities created after the most recent activity in the data file
- Charts support drag-to-zoom functionality for exploring data over time

## License

Personal project - all rights reserved.
