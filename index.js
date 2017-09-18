#!/usr/bin/env node

'use strict';

var debug = require('debug')('servoButton');
var gpio = require('rpi-gpio');
var servoState = require('../servoState');

var pin = 11;
var promise;

gpio.on('change', function(channel, value) {
  if (value === true && promise === undefined) {
    debug('Changes servo state ' + value);

    promise = servoState.change()
      .then(function (state) {
        debug('Server state changed to "' + state + '"');
      })
      .catch(function (ex) {
          debug(ex);
      })
      .then(function () {
          promise = undefined;
      });
  }
});

gpio.setup(pin, gpio.DIR_IN, gpio.EDGE_BOTH, function (err) {
  if (err !== undefined) {
    debug(err);
  } else {
    debug('Setup done');
  }
});

process.on('SIGINT', function () {
  gpio.destroy(function() {
    debug("All pins unexported");

    process.exit();
  });
});
