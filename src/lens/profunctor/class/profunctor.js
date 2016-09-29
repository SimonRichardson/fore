'use strict';

const { compose, identity }   = require('../../../combinators'),
      { isFunction }          = require('../../../helpers'),
      { identity : id }       = require('../category'),
      { curry }               = require('../../../curry');

// dimap :: Profunctor p => (a -> b) -> (c -> d) -> p b c -> p a b
const dimap = curry((a2b, c2d, pbc) => {
      return isFunction(pbc.dimap) ? pbc.dimap(a2b, c2d) : a => c2d(pbc(a2b(a)));
});

// lmap :: Profunctor p => (a -> b) -> p b c -> p a c
const lmap = curry((a2b, pbc) => {
      return isFunction(pbc.lmap) ? pbc.lmap(a2b) :
             isFunction(pbc.dimap) ? dimap(a2b, identity, pbc) :
             compose(pbc, a2b);
});

// rmap :: Profunctor p => (b -> c) -> p a b -> p a c
const rmap = curry((b2c, pab) => {
      return isFunction(pab.rmap) ? pab.rmap(b2c) :
             isFunction(pab.dimap) ? dimap(identity, b2c, pab) :
             compose(b2c, pab);
});

// arr :: Category p, Profunctor p => (a -> b) -> p a b
const arr = curry((Cat, f) => rmap(f, id(Cat)));

module.exports = { dimap
                 , lmap
                 , rmap
                 , arr
                 };
