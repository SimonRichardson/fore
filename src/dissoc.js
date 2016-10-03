'use strict';

const { curry } = require('./curry');

const dissoc = curry((k, o) => {
    const b = extend({}, o);
    delete b[k];
    return b;
});

module.exports = { dissoc
                 };
