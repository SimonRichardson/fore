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
        return arg.constructor === xs._1;
    });
    return interperter.fold(pair => pair._2(arg), () => { throw new Error('Runtime error!') });
};

module.exports = { dispatch };
