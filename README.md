# 🚴‍♂️ Robot Likes Cycling! 🎉

Welcome to the happiest cycling stats tracker on the internet! This delightful project visualizes your cycling (and walking!) adventures with beautiful, interactive charts. Whether you're crushing miles on two wheels or taking leisurely strolls, we've got you covered! 🌟

## ✨ What's This All About?

This is a fun and friendly web application that connects to your Strava account and displays your cycling and walking activities in gorgeous, interactive charts! Watch your progress grow, celebrate your achievements, and get inspired to pedal (or walk) even more! 🎊

**Live Site**: [cycling.robotlikes.com](https://cycling.robotlikes.com)

## 🎯 Amazing Features

- 📊 **Beautiful Charts**: Visualize your rides with stunning Chart.js graphs
- 🚴 **Cycling Stats**: Track distance, speed, and total rides over time
- 🚶 **Walking Stats**: Not just for bikes! Track your walks too
- 🔍 **Interactive Zoom**: Drag to zoom in on specific time periods
- 📈 **Progress Tracking**: See your cumulative distance grow over time
- 🎨 **Clean Design**: Simple, elegant interface that puts your data front and center

## 🚀 Getting Started

Ready to see your cycling adventures come to life? Here's how to get rolling:

### Prerequisites

You'll need:
- Ruby (for running the server and scripts)
- A Strava account (to fetch your amazing rides!)
- Bundler gem installed

### Installation

1. **Clone this awesome repository**:
   ```bash
   git clone https://github.com/jasonrclark/cycling.robotlikes.com.git
   cd cycling.robotlikes.com
   ```

2. **Install the gems**:
   ```bash
   bundle install
   ```

3. **Set up your Strava credentials**:
   Create a `tmp/env.sh` file with your Strava API credentials:
   ```bash
   export STRAVA_CLIENT_ID="your_client_id"
   export STRAVA_CLIENT_SECRET="your_client_secret"
   ```

### 🎪 Running the App

To start the local development server:
```bash
./do-it
```

This will set up your environment and start the server on port 9090. Follow the OAuth flow in your browser to authenticate with Strava and fetch your latest activities. Then visit the site and enjoy! 🎉

## 🛠️ Technology Stack

This project is built with love using:
- **HTML/CSS/JavaScript**: The classic trio! 
- **Chart.js**: For those beautiful, interactive charts
- **Ruby**: Backend magic for Strava integration
- **Strava API**: Where all the cycling data comes from
- **GitHub Pages**: Free hosting that just works!

### Key Libraries:
- `strava-ruby-client`: Ruby gem for Strava API
- `Chart.js 3.9.1`: Chart visualization
- `Hammer.js`: Touch gesture support
- `chartjs-plugin-zoom`: Interactive zooming
- `Moment.js`: Time formatting

## 📁 Project Structure

- `index.html` - The main cycling dashboard 🚴
- `walking.html` - Your walking stats page 🚶
- `code.js` - Chart magic and data visualization
- `rides.json` - Your cycling data
- `walks.json` - Your walking data
- `serve.rb` - Local development server
- `latest` - Script to fetch latest activities from Strava

## 🎨 Customization

Feel free to make this project your own! Want different colors? Update the CSS! Want more stats? Add them to the charts! The code is friendly and well-organized, so dive in and have fun! 🎨

## 🤝 Contributing

Got ideas to make this even more awesome? Contributions are welcome! Feel free to open issues or submit pull requests. Let's make this the best cycling stats tracker together! 💪

## 📝 License

This is a personal project, so ride free and enjoy! 🌈

## 🎉 Happy Cycling!

May your rides be long, your legs be strong, and your charts be ever-upward! Keep pedaling! 🚴‍♀️💨

---

Made with ❤️ and lots of bike rides by a robot who really, truly loves cycling! 🤖🚴
