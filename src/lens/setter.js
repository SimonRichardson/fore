'use strict';

const { curry }    = require('../curry'),
      { constant } = require('../constant'),
      { map }      = require('../map'),
      { Maybe }    = require('../maybe');

const over = curry((l, f, s) => l(f)(s));

const set = curry((l, b, s) => over(l, constant(b), s));

const setJust = curry((l, b, s) => set(l, Maybe.Just(b), s));

const mapped = curry((f, o) => map(f, o));

module.exports = { over
                 , set: set
                 , setJust
                 , mapped
                 };
