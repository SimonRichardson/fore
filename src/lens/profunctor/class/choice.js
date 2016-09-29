'use strict';

const { compose, identity }   = require('../../../combinators'),
      { curry }               = require('../../../curry'),
      { isFunction }          = require('../../../helpers'),
      { lmap }                = require('./profunctor'),
      { identity : id, pipe } = require('../category'),
      { Either }              = require('../../../either');

// left :: Choice p => p a b -> p (Either a c) (Either b c)
const left = pab => isFunction(pab.left) ? pab.left() : e => e.bimap(pab, x => x);

// right :: Choice p => p b c -> p (Either a b) (Either a c)
const right = pbc => isFunction(pbc.right) ? pbc.right() : e => e.map(pbc);

// choice :: Category p, Choice p => p a b - > p c d -> p (Either a c) (Either b d)
const choice = curry((c1, c2) => compose(right(c2), left(c1)));

// join :: Category p, Choice p => p a c -> p b c -> p (Either a b) c
const join = curry((Cat, l, r) => pipe(choice(l, r), lmap(Either.of(identity), id(Cat))));

module.exports = { left
                 , right
                 , choice
                 , join
                 };
