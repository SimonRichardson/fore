'use strict';

const { compose }    = require('../../../compose'),
      { pipe }       = require('../../../pipe'),
      { id }         = require('../../../id'),
      { curry }      = require('../../../curry'),
      { isFunction } = require('../../../is'),
      { Either }     = require('../../../either'),
      { lmap }       = require('./profunctor');

const left = pab => isFunction(pab.left) ? pab.left() : e => e.bimap(pab, x => x);

const right = pbc => isFunction(pbc.right) ? pbc.right() : e => e.map(pbc);

const choice = curry((c1, c2) => compose(right(c2), left(c1)));

const join = curry((l, r) => pipe(choice(l, r), lmap(Either.of(identity), id)));

module.exports = { left
                 , right
                 , choice
                 , join
                 };
