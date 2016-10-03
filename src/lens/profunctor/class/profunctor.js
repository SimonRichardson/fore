'use strict';

const { compose }    = require('../../../compose'),
      { id }         = require('../../../id'),
      { isFunction } = require('../../../is'),
      { curry }      = require('../../../curry');

const dimap = curry((a2b, c2d, pbc) => {
      return isFunction(pbc.dimap) ? pbc.dimap(a2b, c2d) : a => c2d(pbc(a2b(a)));
});

const lmap = curry((a2b, pbc) => {
      return isFunction(pbc.lmap) ? pbc.lmap(a2b) :
             isFunction(pbc.dimap) ? dimap(a2b, identity, pbc) :
             compose(pbc, a2b);
});

const rmap = curry((b2c, pab) => {
      return isFunction(pab.rmap) ? pab.rmap(b2c) :
             isFunction(pab.dimap) ? dimap(identity, b2c, pab) :
             compose(b2c, pab);
});

const arr = curry((f) => rmap(f, id));

module.exports = { dimap
                 , lmap
                 , rmap
                 , arr
                 };
