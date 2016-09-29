'use strict';

const { Fold }   = require('./fold'),
      { UnitM }  = require('./monoid/unit');

// view :: Getter s t a b -> s -> a
const view = Fold.foldOf(UnitM);

module.exports = { view
                 };
