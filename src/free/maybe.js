'use strict';

const { liftF } = require('./free'),
      Maybe = require('../maybe');

const Just = x => liftF(Maybe.Just(x)),
      Nothing = x => liftF(Maybe.Nothing);

module.exports = { Just
                 , Nothing
                 };
