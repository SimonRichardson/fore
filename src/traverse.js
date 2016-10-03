'use strict';

const { map }   = require('./map'),
      { curry } = require('./curry');

const traverse = curry((of, f, traversable) => map(f, traversable).sequence(of));

module.exports = { traverse
                 };
