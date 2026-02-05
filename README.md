# Robot Likes Cycling 🚴

A personal cycling statistics website that visualizes ride data from Strava. View live charts, track progress, and analyze cycling metrics over time.

🌐 **Live Site**: [cycling.robotlikes.com](https://cycling.robotlikes.com)

## Features

- **Interactive Charts**: Visualize ride distance, cumulative totals, and average speed using Chart.js
- **Strava Integration**: Automatically sync ride data from Strava API
- **Time-based Analysis**: Zoom and explore ride history over time
- **Walking Tracker**: Also includes a walking activity tracker
- **Vanity Metrics**: Quick stats including max distance, average speed, total hours, and more

## Project Structure

```
.
├── index.html         # Main cycling dashboard page
├── walking.html       # Walking activity dashboard
├── code.js           # Chart rendering and data visualization logic
├── rides.json        # Processed cycling ride data
├── walks.json        # Processed walking activity data
├── serve.rb          # OAuth server for Strava authentication
├── latest            # Script to fetch latest Strava data
└── Gemfile           # Ruby dependencies (strava-ruby-client, webrick)
```

## Technologies

- **Frontend**: Vanilla JavaScript, Chart.js 3.9
- **Charting**: Chart.js with moment.js adapter for time scales
- **Interactivity**: Hammer.js and chartjs-plugin-zoom for chart interactions
- **Backend**: Ruby with strava-ruby-client gem
- **Hosting**: GitHub Pages (cycling.robotlikes.com)

## Setup

### Prerequisites

- Ruby (for Strava data sync)
- Bundler gem
- Strava API credentials (Client ID and Client Secret)

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

3. Set up environment variables:
```bash
# Create tmp/env.sh with your Strava credentials
export STRAVA_CLIENT_ID="your_client_id"
export STRAVA_CLIENT_SECRET="your_client_secret"
```

4. Run the local development server:
```bash
./do-it
```

This will start a WEBrick server on port 9090 for OAuth authentication.

## Syncing Strava Data

The `serve.rb` script provides an OAuth flow to authenticate with Strava and fetch your latest ride data:

1. Run `./do-it` to start the server
2. Navigate to the authorization URL displayed in the console
3. Authorize the application with Strava
4. Your rides will be automatically fetched and committed to `rides.json`

## Data Format

Ride data is stored in `rides.json` with the following structure:

```json
{
  "id": 35,
  "ride_date": "2011-05-17",
  "distance": 8.87,
  "duration": 1234,
  "average_speed": 12.5,
  "max_speed": 20.3,
  "where_to": "Morning Ride"
}
```

## Deployment

The site is automatically deployed to GitHub Pages from the `main` branch. Any updates to `rides.json` or HTML/JS files will be reflected on the live site.

## License

Personal project - feel free to fork and adapt for your own use!

## Author

Jason Clark - [jasonrclark.com](https://jasonrclark.com)
