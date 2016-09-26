'use strict';

const { taggedSum } = require('./cata');

const Either = taggedSum({ Left  : ['x']
                         , Right : ['x']
                         });

Either.of = Either.Right;

Either.prototype.fold = function(f, g) {
    return this.cata({ Left  : f
                     , Right : g
                     });
};

Either.prototype.map = function(f) {
    return this.chain(x => f(x));
};

Either.prototype.chain = function(f) {
    return this.fold(Either.Left, x => Either.of(f(x)));
};

module.exports = Either;
