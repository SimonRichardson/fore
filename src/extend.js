'use strict';

const { curry } = require('./curry');

const extend = curry((k, o) => {
    const rec = (a, b) => {
        for(let i in b) {
            a[i] = b[i];
        }
        return a;
    };
    return rec(rec({}, a), b);
});


module.exports = { extend
                 };
