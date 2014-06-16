'use strict';

var _ = require('lodash');
var passport = require('passport');
var authenticationOptions = {
  failureRedirect: data.login,
  failureFlash: true
};
var login = passport.authenticate('local', authenticationOptions);

function rememberReturnUrl (req, res, next) {
  req.session.redirect = req.query.redirect;
  next();
}

function redirect (req, res) {
  var sessionRedirect = req.session.redirect;
  delete req.session.redirect;
  res.redirect(req.body.redirect || sessionRedirect || data.success);
}

function requireAnonymous (req, res, next) {
  if (req.user) {
    redirect(req,res);
  }
  next();
}

function logout (req, res) {
  req.logout();
  res.redirect('/');
}

function callbacks (name, options) {
  return {
    auth: passport.authenticate(name, options),
    callback: passport.authenticate(name, authenticationOptions)
  };
}

function routing (data, app, register) {
  app.get(data.logout, logout);
  app.get(data.login, requireAnonymous);

  app.post(data.login, requireAnonymous, login, redirect);
  app.post(data.local, requireAnonymous, local, redirect);

  _.keys(data.providers).forEach(setup);

  function setup (name) {
    var provider = callbacks(name, data.providers[name].options);
    var meta = data[name];
    if (!meta.enabled) {
      return;
    }
    app.get(meta.link, rememberReturnUrl, provider.auth);
    app.get(meta.callback, provider.callback, redirect);
  }

  function local (req, res, next) {
    if (!req.body.create) {
      login(req, res, next);
    } else {
      register(req, res, next);
    }
  }
}

module.exports = routing;