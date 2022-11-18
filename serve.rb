require 'webrick'
require 'strava-ruby-client'

client_id = ENV["STRAVA_CLIENT_ID"]
client_secret = ENV["STRAVA_CLIENT_SECRET"]
scope = "activity:read"

access_token = nil

strava_client ||= Strava::OAuth::Client.new(
    client_id: client_id,
    client_secret: client_secret)

s = WEBrick::HTTPServer.new(:Port => 9090, :DocumentRoot => Dir.pwd)
trap(%q[INT]) { s.shutdown }

s.mount_proc '/auth' do |req, res|
    code = req.query['code']
    response = strava_client.oauth_token(code: code)

    res.body = %(
  <html>
    <body>
      <h3>You may close this window and return to your shell.</h3>
      <ul>
        <li>token_type: #{response.token_type}</li>
        <li>refresh_token: #{response.refresh_token}</li>
        <li>access_token: #{response.access_token}</li>
        <li>expires_at: #{response.expires_at}</li>
      </ul>
    <body>
  </html>
    )

    access_token = response.access_token
end

url = "https://#{ENV["CODESPACE_NAME"]}-9090.preview.app.github.dev/auth"
puts url
redirect_url = strava_client.authorize_url(
    redirect_uri: url,
    response_type: 'code',
    scope: scope)

puts redirect_url

s.start