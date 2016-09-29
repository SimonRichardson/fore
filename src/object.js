'use strict';

const extend = curry((k, o) => {
    const rec = (a, b) => {
        for(let i in b) {
            a[i] = b[i];
        }
        return a;
    };
    return rec(rec({}, a), b);
});

const assoc = curry((k, v, o) => {
    const b = {};
    b[k] = v;
    return extend(o, b);
});

const dissoc = curry((k, o) => {
    const b = extend({}, o);
    delete b[k];
    return b;
});

module.exports = { extend
                 , assoc
                 , dissoc
                 };
