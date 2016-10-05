'use strict';

const { taggedSum } = require('./taggedsum'),
      { curry }     = require('./curry'),
      { isNull }    = require('./is');

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

Either.prototype.left = function() {
    return this.x;
};

Either.prototype.right = function() {
    return this.x;
};

const either = curry((l, r, e) => e.fold(l, r));

module.exports = { Either
                 , either
                 };
