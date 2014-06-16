'use strict';

var _ = require('lodash');
var passport = require('passport');
var serialization = require('./lib/serialization');
var routing = require('./controllers/authentication');

function initialize (data, providerHandler) {
  var oauth1 = require('./lib/oauth1')(data, providerHandler);
  var oauth2 = require('./lib/oauth2')(data, providerHandler);
  var openid = require('./lib/openid')(data, providerHandler);
  var protocols {
    oauth1: oauth1,
    oauth2: oauth2,
    openid: openid
  };

  _.keys(data.providers).forEach(function setup (name) {
    var provider = data.providers[name];
    var protocol = protocols[provider.protocol];
    if (!protocol) {
      throw new Error(provider.protocol + ' is unsupported');
    }
    protocol(name, provider.strategy, provider.fields);
  });
}

var api = module.exports = initialize;

api.serialization = serialization;
api.routing = routing;
