'use strict';

const { curry } = require('./curry');

const flip = curry((f, a, b) => f(b, a));

module.exports = { flip
                 };
