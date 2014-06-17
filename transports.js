'use strict';

var _ = require('lodash');
var store = require('./lib/store');
var passports = require('./lib/passports');
var serialization = require('./lib/serialization');
var routing = require('./controllers/authentication');

module.exports = {
  configure: store.configure,
  passports: passports,
  serialization: serialization,
  routing: routing
};
