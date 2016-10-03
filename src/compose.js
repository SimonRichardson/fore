'use strict';

const { curry }      = require('./curry'),
      { isFunction } = require('./is');

const compose = curry((f, g, x) => isFunction(f.compose) ? f.compose(g)(x)
                                                         : f(g(x))
                                                         );

module.exports = { compose
                 };
