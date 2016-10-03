'use strict';

const { compose }    = require('../../../compose'),
      { pipe }       = require('../../../pipe'),
      { id }         = require('../../../id'),
      { curry }      = require('../../../curry'),
      { isFunction } = require('../../../is'),
      { bimap }      = require('../../../bimap'),
      { map }        = require('../../../map'),
      { Either }     = require('../../../either'),
      { lmap }       = require('./profunctor');

const left = pab => isFunction(pab.left) ? pab.left() : bimap(pab, id);

const right = pbc => isFunction(pbc.right) ? pbc.right() : map(pbc);

const choice = curry((c1, c2) => compose(right(c2), left(c1)));

const join = curry((l, r) => pipe(choice(l, r), lmap(Either.of(identity), id)));

module.exports = { left
                 , right
                 , choice
                 , join
                 };
