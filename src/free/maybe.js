'use strict';

const {taggedSum} = require('../cata'),
      {liftF} = require('./free');

const Maybe = taggedSum({ Just: ['x']
                        , Nothing: []
                        });

const Just = x => liftF(Maybe.Just(x));
const Nothing = liftF(Maybe.Nothing);

Maybe.of = Just;
Maybe.empty = () => Nothing;

Maybe.prototype.fold = function(f, g) {
    return this.cata({ Just: f
                     , Nothing: g
                     });
};

module.exports = { Maybe
                 , Just
                 , Nothing
                 };
