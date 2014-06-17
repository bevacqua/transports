'use strict';

var store = require('./store');

module.exports = function (User, field) {
  var data = store.get();
  var passport = data.passport;
  var id = field || '_id';

  passport.serializeUser(serialize);
  passport.deserializeUser(deserialize);

  function serialize (user, done) {
    done(null, user[id]);
  }

  function deserialize (id, done) {
    var query = {};
    query[id] = id;
    User.findOne(query, function found (err, user) {
      done(err, user ? user.toObject() : null);
    });
  }
};
