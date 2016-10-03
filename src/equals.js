'use strict';

const { curry }      = require('./curry'),
      { isFunction } = require('./is');

const equals = curry((a, b) => isFunction(a.equals) ? a.equals(b) : a === b);

module.exports = { equals
                 };
