'use strict';

const {curry} = require('./curry');

// B combinator
const compose = curry(f => g => x => f(g(x)));

// K combinator
const constant = curry(a => b => a);

// I combinator
const identity = a => a;

module.exports = { compose
                 , constant
                 , identity
                 };
