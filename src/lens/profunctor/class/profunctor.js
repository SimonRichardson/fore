'use strict';

const { compose }    = require('../../../compose'),
      { id }         = require('../../../id'),
      { isFunction } = require('../../../is'),
      { curry }      = require('../../../curry');

const dimap = curry((a2b, c2d, pbc) => {
      return isFunction(pbc.dimap) ? pbc.dimap(a2b, c2d) : compose(c2d, compose(pbc, a2b));
});

const lmap = curry((a2b, pbc) => {
      return isFunction(pbc.lmap) ? pbc.lmap(a2b) :
             isFunction(pbc.dimap) ? dimap(a2b, id, pbc) :
             compose(pbc, a2b);
});

const rmap = curry((b2c, pab) => {
      return isFunction(pab.rmap) ? pab.rmap(b2c) :
             isFunction(pab.dimap) ? dimap(id, b2c, pab) :
             compose(b2c, pab);
});

const arr = curry((_, f) => rmap(f, id));

module.exports = { dimap
                 , lmap
                 , rmap
                 , arr
                 };
