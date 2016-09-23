'use strict';

const curry = (fn) => {
    return function curried(...args) {
        return args.length >= fn.length ? fn.call(this, ...args) : (...argsʹ) => {
            return curried.call(this, ...args, ...argsʹ);
        };
    };
};

const apply = (fn, ...args) => {
    return (...argsʹ) => {
        return fn(...args, ...argsʹ);
    };
};

module.exports = { curry
                 , apply
                 };
