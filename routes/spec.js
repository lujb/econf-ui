var _ = require('underscore');
var fs = require('fs');
var path = require('path');
var express = require('express');
var debug = require('debug')('spec');
var econf = require('erlang-conf');
var ecsd = require('ecsd');
var ewpSpecs = require('ewp-ecsd');
var router = express.Router();



router.get('/list', function(req, res, next) {
  debug('list confs..');

  var k, confs = [];
  for(k in ewpSpecs) confs.push(k);

  res.status(200).send({confs: confs});
});

router.get('/conf/:name', function(req, res, next) {
  debug('get spec for:', req.params.name);

  var cont = ewpSpecs[req.params.name];
  var term = econf.parse(cont);
  var spec = ecsd.parse(term);

  res.status(200).send({spec: spec});
});

router.post('/stringify', function(req, res, next) {
  var ast = req.body.ast;
  debug('generating..');

  var term = ecsd.unparse(ast);
  var out = econf.stringify(term);

  res.status(200).send({out: out});
});

module.exports = router;
