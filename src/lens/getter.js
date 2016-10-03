'use strict';

const { Fold }   = require('./fold'),
      { UnitM }  = require('../monoid/unit');

const view = Fold.foldOf(UnitM);

module.exports = { view
                 };
