'use strict';

const { curry } = require('./curry');

const assoc = curry((k, v, o) => {
    const b = {};
    b[k] = v;
    return extend(o, b);
});

module.exports = { assoc
                 };
