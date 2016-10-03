'use strict';

const apply = (fn, ...args) => {
    return (...argsʹ) => {
        return fn(...args, ...argsʹ);
    };
};

module.exports = { apply
                 };
