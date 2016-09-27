'use strict';

const { liftF } = require('./free'),
      Maybeʹ    = require('../maybe');

const Just = x => liftF(Maybeʹ.Just(x)),
      Nothing = () => liftF(Maybeʹ.Nothing);

const Maybe = { of: Just
              , empty: Nothing
              };

module.exports = { Maybe
                 , Just
                 , Nothing
                 };
