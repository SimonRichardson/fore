'use strict';

const { taggedSum } = require('./cata');

const Maybe = taggedSum({ Just      : ['x']
                        , Nothing   : []
                        });

Maybe.of = Maybe.Just;
Maybe.empty = () => Maybe.Nothing;

Maybe.prototype.fold = function(f, g) {
    return this.cata({ Just         : f
                     , Nothing      : g
                     });
};

Maybe.prototype.map = function(f) {
    return this.cata({ Just         : x => Maybe.Just(f(x))
                     , Nothing      : () => Maybe.Nothing
                     });
};

Maybe.prototype.chain = function(f) {
    return this.cata({ Just         : x => f(x)
                     , Nothing      : () => Maybe.Nothing
                     });
};

module.exports = Maybe;
