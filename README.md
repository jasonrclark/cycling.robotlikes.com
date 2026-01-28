# Robot Likes Cycling

A personal cycling and walking activity tracker that visualizes Strava data through interactive charts.

🚴 **Live Site**: [cycling.robotlikes.com](https://cycling.robotlikes.com)

## Overview

This project is a static website that displays cycling and walking statistics with interactive visualizations using Chart.js. It fetches activity data from Strava and presents it through clean, zoomable charts showing distance, speed, and cumulative metrics over time.

## Features

- **Cycling Dashboard** (`index.html`): Track and visualize cycling rides
  - Individual ride distances over time
  - Cumulative total distance
  - Average and max speed tracking
  - Statistics: max distance, average distance, ride count, total hours/days

- **Walking Dashboard** (`walking.html`): Track and visualize walks
  - Individual walk distances over time
  - Cumulative total distance
  - Statistics: max distance, average distance, walk count

- **Interactive Charts**:
  - Zoom and pan functionality using drag gestures
  - Hover tooltips with detailed ride/walk information
  - Time-series visualization using moment.js

## Technology Stack

- **Frontend**: Vanilla JavaScript, HTML, CSS
- **Charting**: Chart.js v3.9.1 with zoom and time-scale plugins
- **Backend**: Ruby with WEBrick server for Strava OAuth
- **Data Source**: Strava API via `strava-ruby-client`

## Project Structure

```
.
├── index.html          # Main cycling dashboard
├── walking.html        # Walking dashboard
├── code.js            # Chart rendering and data visualization logic
├── rides.json         # Cycling activity data
├── walks.json         # Walking activity data
├── serve.rb           # Ruby server for Strava OAuth callback
├── latest             # Script to fetch latest activities from Strava
├── do-it              # Helper script to run the server
├── Gemfile            # Ruby dependencies
└── CNAME              # GitHub Pages domain configuration
```

## Setup

### Prerequisites

- Ruby (for Strava data updates)
- Bundler
- Strava API credentials (for data updates)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/jasonrclark/cycling.robotlikes.com.git
cd cycling.robotlikes.com
```

2. Install Ruby dependencies:
```bash
bundle install
```

3. Set up Strava API credentials (for data updates):
```bash
# Create tmp/env.sh with your Strava credentials
export STRAVA_CLIENT_ID="your_client_id"
export STRAVA_CLIENT_SECRET="your_client_secret"
```

## Usage

### Viewing the Site Locally

Since this is a static site, you can simply open `index.html` in a browser, or use any static file server:

```bash
# Using Python
python3 -m http.server 8000

# Or using Ruby WEBrick
ruby serve.rb
```

Then navigate to `http://localhost:8000` (or `:9090` for Ruby server).

### Updating Activity Data

To fetch the latest activities from Strava:

1. Run the OAuth server:
```bash
./do-it
```

2. Follow the authorization flow to connect to Strava

3. The script will automatically fetch new activities and update the JSON files

## Data Format

### Rides Data (`rides.json`)
```json
{
  "id": 35,
  "ride_date": "2011-05-17",
  "distance": 8.87,
  "time": "0:37:43",
  "average_speed": 14,
  "max_speed": 28,
  "where_to": "Morning",
  "notes": "",
  "duration": 2263
}
```

### Walks Data (`walks.json`)
```json
{
  "walk_date": "2024-01-15",
  "distance": 5.2
}
```

## Deployment

The site is hosted on GitHub Pages with a custom domain configured via the `CNAME` file. Any push to the main branch will automatically deploy the updated site.

## Contributing

This is a personal project, but suggestions and improvements are welcome! Feel free to open an issue or submit a pull request.

## License

Personal project - all rights reserved.

## Author

Jason Clark - [jasonrclark.com](https://jasonrclark.com)
