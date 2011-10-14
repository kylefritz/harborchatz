require 'net/http'

message=$currentCall.initialText
from=$currentCall.callerID

#reply back as a text
say "'#{message}' sent"

#post message to chat room
http = Net::HTTP.new('harborchatz.com')
http.post "/message" , "message=#{text}&from=#{from}"
