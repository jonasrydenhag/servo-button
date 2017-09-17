#!/usr/bin/env node

'use strict';

var gpio = require('rpi-gpio');
var servoState = require('../servoState');

var pin = 11;

gpio.on('change', function(channel, value) {
  if (value === true) {
    servoState.change()
      .then(function (state) {
        console.log('Server state changed to "' + state + '"');
      });
  }
});

gpio.setup(pin, gpio.DIR_IN, gpio.EDGE_RISING);

process.on('SIGINT', function () {
  gpio.destroy(function() {
    console.log('All pins unexported');
  });
});
