'use strict';

const { foldOf } = require('./fold'),
      { Unit }   = require('../monoid/unit');

const view = foldOf(Unit);

module.exports = { view
                 };
