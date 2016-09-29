'use strict';

const {curry} = require('./curry');

const compose = curry(f => g => x => f(g(x)));

const constant = curry(a => b => a);

const identity = a => a;

module.exports = { compose
                 , constant
                 , identity
                 };
