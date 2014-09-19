'use strict';

var store = require('./store');

module.exports = function (fieldName) {
  var data = store.get();
  var passport = data.passport;
  var field = fieldName || '_id';

  passport.serializeUser(serialize);
  passport.deserializeUser(deserialize);

  function serialize (user, done) {
    done(null, user[field]);
  }

  function deserialize (id, done) {
    done(null, id);
  }
};
