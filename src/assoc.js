'use strict';

const { curry }  = require('./curry'),
      { extend } = require('./extend');

const assoc = curry((k, v, o) => {
    const b = {};
    b[k] = v;
    return extend(o, b);
});

module.exports = { assoc
                 };
