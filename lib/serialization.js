'use strict';

var store = require('./store');

module.exports = function (User, fieldName) {
  var data = store.get();
  var passport = data.passport;
  var field = fieldName || '_id';

  passport.serializeUser(serialize);
  passport.deserializeUser(deserialize);

  function serialize (user, done) {
    done(null, user[field]);
  }

  function deserialize (id, done) {
    var query = {};
    query[field] = id;
    User.findOne(query, function found (err, user) {
      done(err, user ? user.toObject() : null);
    });
  }
};
