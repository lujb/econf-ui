var debug = require('debug')('misc');
var express = require('express');
var router = express.Router();



router.get('/ping', function(req, res, next) {
  debug('ping..');

  res.status(200).send('pong');
});

router.get('/shutdown', function(req, res, next) {
  debug('shutdown..');
  process.exit();
});

module.exports = router;