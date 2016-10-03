'use strict';

const { curry } = require('./curry');

const constant = curry((a, _) => a);

module.exports = { constant
                 };
