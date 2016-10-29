'use strict';

var https = require('https');
var url = require('url');

// https://api.slack.com/events-api
exports.handler = function(event, context, callback) {

  var incoming_web_hook = "https://hooks.slack.com/services/xxxxxxxxxx";

  var done = function(success, response) {
    callback(null, {
        statusCode: success ? '200' : '400',
        body: JSON.stringify(response),
        headers: {
            'Content-Type': 'application/json',
        },
    });
  };

  var request = JSON.parse(event.body);
  var type = request.type;

  // Just make the type based on event for callbacks
  if (type == "event_callback") {
    type = request.event.type;
  }

  var postMessage = function(channel, message) {
    var payload = {
      "text" : message,
      "channel" : channel
    };

    var body = JSON.stringify(payload);
    var options = url.parse(incoming_web_hook);
    options.method = 'POST';
    options.headers = {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body),
    };

    var postReq = https.request(options, function(res) {
      var chunks = [];
      res.setEncoding('utf8');
      res.on('data', function(chunk) {
        return chunks.push(chunk);
      });
      res.on('end', function() {
        var body = chunks.join('');
      });
      return res;
    });

    postReq.write(body);
    postReq.end();
  };

  var eventChannelMessage = function() {
    if (request.event.text == "hey larry") {
      done(true, { "text" : "hi :troll:" });
    }
  };

  // Handle request based on type...
  switch (type)
  {
    // case "ping":
    //   done(true, { "message" : "pong" });
    //   break;
    case "url_verification":
      done(true, { "challenge" : request.challenge });
      break;
    // case "message":
    //   eventChannelMessage();
    //   break;
    default:
      // done(true, { "message" : "malformed request / unknown operation" });
      postMessage("larrys-fan-club", "test");
      done(true, { "text" : "hi, didnt get that :troll:"});
      break;
  }

};
