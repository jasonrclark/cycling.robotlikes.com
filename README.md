# Robot Likes Cycling

A personal cycling activity tracker and visualization dashboard that pulls ride data from Strava and displays interactive charts showing cycling statistics over time.

**Live site:** https://cycling.robotlikes.com

## Features

- 📊 **Interactive Charts** - Visualize cycling data with Chart.js including:
  - Individual ride distances (bar chart)
  - Cumulative total distance over time (scatter plot)
  - Average speed per ride (scatter plot)
- 🔍 **Zoom & Pan** - Interactive chart exploration with zoom and pan capabilities
- 📈 **Statistics Dashboard** - Key metrics at a glance:
  - Maximum distance
  - Average distance
  - Total rides count
  - Total distance
  - Total time (hours and days)
  - Average and max speed
- 🚶 **Walking Tracker** - Bonus walking activity page

## Technology Stack

- **Frontend**: Vanilla JavaScript with Chart.js for visualization
- **Data Source**: Strava API
- **Backend**: Ruby with Strava Ruby Client
- **Hosting**: GitHub Pages
- **Styling**: Pixyll CSS theme

### Key Dependencies

- [Chart.js 3.9.1](https://www.chartjs.org/) - Charting library
- [Moment.js](https://momentjs.com/) - Time series data handling
- [Hammer.js](https://hammerjs.github.io/) - Touch gesture support
- [chartjs-plugin-zoom](https://www.chartjs.org/chartjs-plugin-zoom/) - Chart zoom functionality
- [strava-ruby-client](https://github.com/dblock/strava-ruby-client) - Strava API integration
- [WEBrick](https://github.com/ruby/webrick) - HTTP server (explicitly required for Ruby 3.0+)

## Setup

### Prerequisites

- Ruby (with bundler)
- Strava API credentials (Client ID and Client Secret)
- GitHub account (for GitHub Pages hosting)

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

3. Set up environment variables (create `tmp/env.sh`):
   ```bash
   export STRAVA_CLIENT_ID="your_client_id"
   export STRAVA_CLIENT_SECRET="your_client_secret"
   ```

4. Get your Strava API credentials from [Strava API Settings](https://www.strava.com/settings/api)

## Usage

### Local Development

Run the local server with OAuth authentication:

```bash
./do-it
```

This will:
- Start a WEBrick server on port 9090
- Display an authorization URL for Strava OAuth
- Handle the OAuth callback and fetch latest activities

### Fetching New Rides

The `latest` script fetches new activities from Strava:

```bash
bundle exec ./latest <access_token>
```

This script:
- Reads existing `rides.json`
- Fetches activities after the most recent ride
- Updates `rides.json` with new data
- Converts speeds from m/s to mph
- Extracts relevant fields (distance, duration, speed, etc.)

### Data Structure

Rides are stored in `rides.json` with the following structure:

```json
{
  "strava_id": 123456,
  "ride_date": "2011-05-17",
  "distance": 8.87,
  "time": "0:37:43",
  "duration": 2263,
  "average_speed": 14,
  "max_speed": 28,
  "where_to": "Morning",
  "notes": ""
}
```

## Development

### Project Structure

```
.
├── index.html         # Main cycling dashboard
├── walking.html       # Walking activity page
├── code.js           # Chart rendering logic
├── rides.json        # Cycling data
├── walks.json        # Walking data
├── serve.rb          # OAuth and data sync server
├── latest            # Script to fetch new activities
└── Gemfile           # Ruby dependencies
```

### Workflow

1. Authenticate with Strava via OAuth
2. Fetch latest activities using the Strava API
3. Process and store data in JSON files
4. Static site displays data with interactive charts
5. Hosted on GitHub Pages (auto-deploys from main branch)

## Customization

To adapt this for your own cycling data:

1. Fork the repository
2. Update `CNAME` with your domain (or remove for github.io domain)
3. Configure your Strava API credentials
4. Run the OAuth flow to authenticate and fetch your activities
5. Commit the updated `rides.json` to deploy

## Contributing

This is a personal project, but feel free to fork it and adapt it for your own use!

## License

No explicit license specified - see repository for details.
