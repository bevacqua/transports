'use strict';

var _ = require('lodash');
var passports = require('./lib/passports');
var serialization = require('./lib/serialization');
var routing = require('./controllers/authentication');

module.exports = {
  passports: passports,
  serialization: serialization,
  routing: routing
};
