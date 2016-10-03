'use strict';

const { curry } = require('./curry');

const extend = curry((a, b) => {
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
