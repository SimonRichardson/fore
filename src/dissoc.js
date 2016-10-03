'use strict';

const { curry }  = require('./curry'),
      { extend } = require('./extend');

const dissoc = curry((k, o) => {
    const b = extend({}, o);
    delete b[k];
    return b;
});

module.exports = { dissoc
                 };
