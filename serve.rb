require 'webrick'
require 'strava-ruby-client'

client_id = ENV["STRAVA_CLIENT_ID"]
client_secret = ENV["STRAVA_CLIENT_SECRET"]
scope = "activity:read"

strava_client ||= Strava::OAuth::Client.new(
    client_id: client_id,
    client_secret: client_secret)

s = WEBrick::HTTPServer.new(:Port => 9090, :DocumentRoot => Dir.pwd)
trap(%q[INT]) { s.shutdown }

s.mount_proc '/auth' do |req, res|
  begin
    code = req.query['code']
    response = strava_client.oauth_token(code: code)

    output = ""
    output += `bundle exec ./latest #{response.access_token}`
    output += `git diff rides.json`
    output += `git add rides.json && git commit -m "Rides update" && git push origin main`

    res.body = output
  rescue => ex
    puts ex
  end
end

url = "https://#{ENV["CODESPACE_NAME"]}-9090.preview.app.github.dev/auth"
puts url
redirect_url = strava_client.authorize_url(
    redirect_uri: url,
    response_type: 'code',
    scope: scope)

puts redirect_url

s.start