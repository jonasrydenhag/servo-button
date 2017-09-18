#!/usr/bin/env node

'use strict';

var debug = require('debug')('servoButton');
var gpio = require('rpi-gpio');
var servoState = require('../servoState');

var pin = 11;
var promise;

gpio.on('change', function(channel, value) {
  if (value === true && promise === undefined) {
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

gpio.setup(pin, gpio.DIR_IN, gpio.EDGE_RISING);

process.on('SIGINT', function () {
  gpio.destroy(function() {
    var msg = "All pins unexported";
    debug(msg);
    console.log(msg);

    process.exit();
  });
});
