'use strict';

const { view }   = require('../../src/lens/getter'),
      { _2 }     = require('../../src/lens/lens'),
      { tuple2 } = require('../../src/tuple');

console.log(view(_2, tuple2('foo', 42)));
