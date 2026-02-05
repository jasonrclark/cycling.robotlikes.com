# cycling.robotlikes.com

A personal cycling and walking statistics visualization website that pulls activity data from Strava and displays interactive charts.

## 🚴 Overview

This project creates a static website that displays cycling and walking statistics using data from Strava. The site features interactive charts showing:

- **Ride Distance** - Individual ride distances over time
- **Total Distance** - Cumulative distance traveled
- **Average Speed** - Speed trends across activities
- **Activity Statistics** - Max, average, total hours, and total days

## 🌐 Live Site

Visit the live site at [cycling.robotlikes.com](https://cycling.robotlikes.com)

## ✨ Features

- Interactive charts built with [Chart.js](https://www.chartjs.org/)
- Zoom and pan functionality using [chartjs-plugin-zoom](https://github.com/chartjs/chartjs-plugin-zoom)
- Time-based x-axis using [moment.js](https://momentjs.com/)
- Separate pages for cycling and walking activities
- Automatic Strava data synchronization

## 🛠️ Tech Stack

- **Frontend**: HTML, JavaScript, Chart.js
- **Backend**: Ruby (for Strava OAuth integration)
- **Data Source**: Strava API
- **Hosting**: GitHub Pages

## 📋 Prerequisites

- Ruby (with Bundler)
- A Strava account with API credentials

## 🚀 Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/jasonrclark/cycling.robotlikes.com.git
   cd cycling.robotlikes.com
   ```

2. **Install dependencies**
   ```bash
   bundle install
   ```

3. **Set up Strava API credentials**
   
   Create a file `tmp/env.sh` with your Strava credentials:
   ```bash
   export STRAVA_CLIENT_ID="your_client_id"
   export STRAVA_CLIENT_SECRET="your_client_secret"
   ```

4. **Run the local server**
   ```bash
   ./do-it
   ```

5. **Authenticate with Strava**
   
   Follow the OAuth flow to authorize the application to access your Strava data.

## 📂 Project Structure

```
.
├── index.html          # Main cycling statistics page
├── walking.html        # Walking statistics page
├── code.js            # Chart rendering and utility functions
├── rides.json         # Cycling activity data
├── walks.json         # Walking activity data
├── serve.rb           # Ruby server for Strava OAuth
├── latest             # Script to fetch latest activities from Strava
├── do-it              # Convenience script to start the server
└── Gemfile            # Ruby dependencies
```

## 🔄 Updating Data

The `latest` script fetches new activities from Strava:

```ruby
./latest <access_token>
```

This script:
1. Finds the most recent activity in `rides.json`
2. Fetches newer activities from Strava
3. Converts metrics (m/s → mph, meters → miles)
4. Updates `rides.json` with new data

## 📊 Data Format

Activity data is stored in JSON format with the following structure:

```json
{
  "id": 35,
  "ride_date": "2011-05-17",
  "distance": 8.87,
  "time": "0:37:43",
  "average_speed": 14,
  "max_speed": 28,
  "where_to": "Morning",
  "duration": 2263,
  "bike_id": 1
}
```

## 🤝 Contributing

This is a personal project, but feel free to fork it and adapt it for your own use!

## 📝 License

This project is open source and available for personal use.

## 🔗 Links

- [Strava API Documentation](https://developers.strava.com/)
- [strava-ruby-client](https://github.com/dblock/strava-ruby-client)
