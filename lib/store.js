'use strict';

var data;

module.exports = {
  configure: configure,
  get: get
};

function configure (value) {
  data = value;
  data.configure = configure;
}

function get () {
  return data || {};
}
