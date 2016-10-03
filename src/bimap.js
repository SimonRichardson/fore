'use strict';

const { curry } = require('./curry');

const bimap = curry((f, g, o) => o.bimap(f, g));

module.exports = { bimap
                 };
