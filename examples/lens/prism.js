'use strict';

const { preview } = require('../../src/lens/fold'),
      { Justʹ }   = require('../../src/lens/prism'),
      { Maybe }   = require('../../src/maybe');

console.log(preview(Justʹ, Maybe.Just(42)));
