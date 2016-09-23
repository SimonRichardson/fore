'use strict';

const find = (xs, f) => {
    for (let x in xs) {
        if (f(xs[x])) {
            return xs[x];
        }
    }
    return;
};

const dispatch = pairs => arg => {
    const interperter = find(pairs, xs => arg.constructor === xs[0])[1];
    return interperter(arg);
};

module.exports = { dispatch };
