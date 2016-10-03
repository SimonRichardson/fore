'use strict';

const { curry }   = require('./curry'),
      { compose } = require('./compose');

const pipe = curry((f, g) => compose(g, f));

module.exports = { pipe
                 };
