'use strict';

const Maybe = require('../maybe');

const find = (xs, f) => {
    for (let x in xs) {
        if (f(xs[x])) {
            return Maybe.Just(xs[x]);
        }
    }
    return Maybe.Nothing;
};

const dispatch = pairs => arg => {
    const interperter = find(pairs, xs => {
        return arg.constructor === xs[0];
    });
    return interperter.fold(args => args[1](arg), () => { throw new Error("FUCK") });
};

module.exports = { dispatch };
