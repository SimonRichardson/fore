'use strict';

const { curry } = require('./curry');

const prepend = curry((a, b) => [a].concat(b));

module.exports = { prepend
                 };
