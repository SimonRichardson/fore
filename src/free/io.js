'use strict';

const { liftF } = require('./free'),
      IOʹ       = require('../io');

const IO = x => liftF(IOʹ(x));

IO.of = IO;

module.exports = IO;
