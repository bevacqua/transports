'use strict';

var _ = require('lodash');

function passports (data, providerHandler) {
  var protocols = {
    oauth1: require('./oauth1')(data, providerHandler),
    oauth2: require('./oauth2')(data, providerHandler),
    openid: require('./openid')(data, providerHandler)
  };

  _.keys(data.providers).forEach(function setup (name) {
    var provider = data.providers[name];
    var protocol = protocols[provider.protocol];
    if (!protocol) {
      throw new Error(provider.protocol + ' is unsupported');
    }
    protocol(name);
  });
}

module.exports = passports;
