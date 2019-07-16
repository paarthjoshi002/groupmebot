var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      insertRegex = /insert*/i,
      removeRegex = /bible*/i;
  
  var fs = require('fs');

  if(request.text && insertRegex.test(request.text)) {
    fs.appendFile('output.txt', this.res.url, function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
    this.res.writeHead(200);
    postMessage();
    this.res.end();
  } 
  else if(request.text && removeRegex.test(request.text)) {
    fs.appendFile('output.txt', this.res.url, function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
    this.res.writeHead(200);
    postMessage();
    this.res.end();
  }
  else {
  console.log("don't care");
  this.res.writeHead(200);
  this.res.end();
  }
}

function postMessage() {
  var botResponse, options, body, botReq;

  botResponse = cool();

  /*options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };*/
  
  options = {
    hostname: 'api.groupme.com',
    path: '/v3/groups/42071764/members/add?token=36633e408a260137b88a62dd589ed495',
    method: 'POST'
  };
  
  /*options = {
    hostname: 'api.groupme.com',
    path: '/v3/groups/42071764/members/8c976aac-885c-465e-9c06-2c70b1f1f570/remove?token=36633e408a260137b88a62dd589ed495',
    method: 'POST'
  };*/

  /*body = {
    "bot_id" : botID,
    "text" : "Testing part2",
    "membership": {
      "nickname": "Potty"
    }
  };*/
  
  body = {
    "members": [
      {
        "nickname": "Buckbeak",
        "phone_number": "+1 2245231639",
        "guid": "GUID-2"
      }
    ]
  };
  
  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;
