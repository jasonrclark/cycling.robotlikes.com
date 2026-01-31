# Robot Likes Cycling 🚴

A personal cycling and walking activity tracker that visualizes ride statistics using interactive charts. This project fetches activity data from Strava and displays detailed metrics like distance, speed, and duration over time.

## 🌐 Live Demo

Visit the live site at [https://cycling.robotlikes.com](https://cycling.robotlikes.com)

## ✨ Key Features

- **Interactive Charts**: Visualize cycling and walking data with Chart.js
  - Per-ride distance bar charts
  - Cumulative distance over time
  - Average and max speed tracking
  - Zoom and pan capabilities for detailed analysis
- **Strava Integration**: Automatically fetches and updates activity data from Strava API
- **Dual Activity Tracking**: Separate pages for cycling and walking activities
- **Real-time Statistics**: Displays max, average, and total metrics
- **Responsive Design**: Clean, modern interface styled with Pixyll CSS

## 🛠️ Technologies Used

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Charting**: Chart.js 3.9.1 with moment.js adapter and zoom plugin
- **Backend**: Ruby with WEBrick for OAuth authentication
- **API Integration**: Strava Ruby Client
- **Deployment**: GitHub Pages with automated CI/CD

## 📦 Installation

### Prerequisites

- Ruby (for local development and Strava sync)
- Bundler
- Strava API credentials (Client ID and Client Secret)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/jasonrclark/cycling.robotlikes.com.git
   cd cycling.robotlikes.com
   ```

2. **Install Ruby dependencies**
   ```bash
   bundle install
   ```

3. **Configure Strava API credentials**
   
   Create a `tmp/env.sh` file with your Strava API credentials:
   ```bash
   export STRAVA_CLIENT_ID="your_client_id"
   export STRAVA_CLIENT_SECRET="your_client_secret"
   ```

4. **Run the local server**
   ```bash
   ./do-it
   ```
   
   This will start a WEBrick server on port 9090 for OAuth authentication.

## 🚀 Usage

### Viewing the Site Locally

Simply open `index.html` in a web browser, or use any local HTTP server:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Ruby (WEBrick)
ruby -run -ehttpd . -p8000
```

Then navigate to `http://localhost:8000` in your browser.

### Syncing New Activities from Strava

1. Run the authentication server:
   ```bash
   ./do-it
   ```

2. Follow the OAuth flow by visiting the URL displayed in the console

3. After authentication, the script will:
   - Fetch activities since the last recorded ride
   - Update `rides.json` with new data
   - Automatically commit and push changes to the repository

Alternatively, use the `latest` script directly with an access token:
```bash
bundle exec ./latest <strava_access_token>
```

## 📊 Data Structure

### rides.json

Each ride entry contains:
```json
{
  "strava_id": 123456789,
  "ride_date": "2011-05-17",
  "duration": 2263,
  "average_speed": 14.0,
  "max_speed": 28.0,
  "created_at": "2011-05-17T16:09:58",
  "where_to": "Morning Ride",
  "distance": 8.87
}
```

- **distance**: Miles
- **duration**: Seconds
- **average_speed** / **max_speed**: Miles per hour (mph)
- **ride_date**: ISO date format (YYYY-MM-DD)

### walks.json

Similar structure with `walk_date` instead of `ride_date`.

## 🔧 Configuration

### Environment Variables

- `STRAVA_CLIENT_ID`: Your Strava application client ID
- `STRAVA_CLIENT_SECRET`: Your Strava application client secret
- `CODESPACE_NAME`: (Optional) For GitHub Codespaces development
- `GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN`: (Optional) For GitHub Codespaces development

### Strava API Setup

1. Create a Strava application at [https://www.strava.com/settings/api](https://www.strava.com/settings/api)
2. Set the authorization callback domain to your local development URL or Codespaces URL
3. Copy the Client ID and Client Secret to your `tmp/env.sh` file

## 🚢 Deployment

The site is automatically deployed to GitHub Pages via GitHub Actions:

- Pushes to the `main` branch trigger the deployment workflow
- The workflow is defined in `.github/workflows/static.yml`
- All files in the repository root are deployed as static content
- The site is accessible at the custom domain specified in the `CNAME` file

### Manual Deployment

The site is pure static HTML/CSS/JS, so it can be deployed to any static hosting service:
- GitHub Pages (current setup)
- Netlify
- Vercel
- AWS S3 + CloudFront
- Any web server

## 📁 Project Structure

```
.
├── index.html          # Main cycling page
├── walking.html        # Walking activities page
├── code.js            # Chart rendering and data visualization logic
├── rides.json         # Cycling activity data
├── walks.json         # Walking activity data
├── serve.rb           # OAuth authentication server for Strava
├── latest             # Script to fetch latest activities from Strava
├── do-it              # Helper script to run the OAuth server
├── Gemfile            # Ruby dependencies
└── .github/
    └── workflows/
        └── static.yml # GitHub Pages deployment workflow
```

## 🤝 Contributing

This is a personal project, but suggestions and improvements are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available for personal use. Please respect the data privacy and only use your own Strava data.

## 👤 Author

**Jason Clark**

- Website: [https://jasonrclark.com](https://jasonrclark.com)
- GitHub: [@jasonrclark](https://github.com/jasonrclark)

## 🙏 Acknowledgements

- [Strava API](https://developers.strava.com/) for activity data
- [Chart.js](https://www.chartjs.org/) for beautiful, responsive charts
- [strava-ruby-client](https://github.com/dblock/strava-ruby-client) for Ruby API integration
- [Pixyll](https://pixyll.com/) for CSS styling
