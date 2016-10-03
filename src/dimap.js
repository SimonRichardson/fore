'use strict';

const { curry } = require('./curry');

const dimap = curry((f, g, o) => o.dimap(f, g));

module.exports = { dimap
                 };
