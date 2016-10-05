'use strict';

const { id }         = require('../../../id'),
      { pipe }       = require('../../../pipe'),
      { curry }      = require('../../../curry'),
      { isFunction } = require('../../../is'),
      { tuple2 }     = require('../../../tuple'),
      { rmap }       = require('./profunctor');

const first = p => isFunction(p.first) ? p.first() : t => tuple2(p(t.first()), t.second());

const second = p => isFunction(p.second) ? p.second() : map(p);

const both = curry((p1, p2) => pipe(first(p1), second(p2)));

const split = curry((_, l, r) => pipe(rmap(a => tuple2(a, a), id), both(l, r)));

module.exports = { first
                 , second
                 , both
                 , split
                 };
