'use strict';

const { curry } = require('./curry');

const map = curry((fn, o) => o.map(fn));

module.exports = { map
                 };
