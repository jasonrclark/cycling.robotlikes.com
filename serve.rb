require 'webrick'
s = WEBrick::HTTPServer.new(:Port => 9090, :DocumentRoot => Dir.pwd)
trap(%q[INT]) { s.shutdown }
s.start