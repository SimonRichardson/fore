'use strict';

const { curry }     = require('./curry'),
      { taggedSum } = require('./taggedsum');

const Maybe = taggedSum({ Just      : ['x']
                        , Nothing   : []
                        });

Maybe.of = Maybe.Just;

Maybe.empty = () => Maybe.Nothing;

Maybe.prototype.fold = function(f, g) {
    return this.cata({ Just    : f
                     , Nothing : g
                     });
};

Maybe.prototype.map = function(f) {
    return this.chain(a => Maybe.of(f(a)));
};

Maybe.prototype.chain = function(f) {
    return this.fold(a => f(a), () => Maybe.empty);
};

Maybe.prototype.reduce = function(f, x) {
    return this.cata({ Just    : y => f(x, y)
                     , Nothing : x
                     });
};

const maybe = curry((n, j, m) => m.reduce((_, x) => j(x), n));

module.exports = { Maybe
                 , maybe
                 };
