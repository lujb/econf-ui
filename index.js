var fs = require('fs');
var path = require('path');
var portfinder = require('portfinder');
var spawn = require('child_process').spawn
var request = require('request');

exports.start = function(cb) {
  portfinder.getPort(function (err, port) {
    if (err) {
      cb(err);
    } else {
      var out = fs.openSync('report.log', 'a');
      var err = fs.openSync('report.log', 'a');
      var cmd = path.join(__dirname, 'bin', 'boot');
      var backend = spawn(cmd, [port], {detached:true, stdio: [ 'ignore', out, err ]});
      backend.unref();
      cb(null, port);
    }
  });
}

exports.ping = function(host, cb) {
  request(host + '/misc/ping', function (error, response, body) {
    var online = false;
    if (!error && response.statusCode===200 && body==='pong') {
      online = true;
    }

    cb(online);
  })  
}