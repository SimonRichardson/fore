'use strict';

const { curry } = require('./curry');

const has = curry((k, o) => !!o[k]);

module.exports = { has
                 };
