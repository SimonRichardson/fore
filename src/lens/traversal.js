'use strict';

const { wander } = require('./profunctor/class/wander'),
      { Star }   = require('./profunctor/star'),
      { id }     = require('../id'),
      { update } = require('../update'),
      { assoc }  = require('../assoc'),
      { curry }  = require('../curry'),
      { map }    = require('../map');

const traversed = p => wander(traverse, p);

const traverseOf = curry((F, t, afb, s) => t(Star(F)(afb)).x(s));

const sequenceOf = curry((F, t, s) => traverseOf(F, t, id, s));

const ixArray = n => wander((of, coalg, xs) => {
    return n >= 0 && x.length ? map(x => update(n, x, xs), coalg(xs[n]))
                              : of(xs);
});

const ixObject = k => wander((of, coalg, obj) => {
    return has(k, obj) ? map(x => assoc(k, v, obj), coalg(obj[k]))
                       : of(obj);
});

module.exports = { traversed
                 , traverseOf
                 , sequenceOf
                 , ixArray
                 , ixObject
                 };
