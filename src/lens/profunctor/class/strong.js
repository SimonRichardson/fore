'use strict';

const { identity }                  = require('../../../combinators'),
      { curry }                     = require('../../../curry'),
      { isFunction }                = require('../../../helpers'),
      { identity : id, pipe }       = require('../category'),
      { tuple2 }                    = require('../../../tuple'),
      { rmap }                      = require('./profunctor');

// first :: Strong p => p a c -> p (Tuple a b) (Tuple c b)
const first = p => isFunction(p.first) ? p.first() : t => tuple2(p(t.first()), t.second());

// second :: Strong p => p b c -> p (Tuple a b) (Tuple a c)
const second = p => isFunction(p.second) ? p.second() : t => tuple2(t.first(), p(t.second()));

// both :: Category p, Strong p => p a b -> p c d -> p (Tuple a c) (Tuple b d)
const both = curry((p1, p2) => pipe(first(p1), second(p2)));

// split :: Category p, Strong p => Type p -> p a b -> p a c -> p a (Tuple b c)
const split = curry((Cat, l, r) => pipe(rmap(a => tuple2(a, a), id(Cat)), both(l, r)));

module.exports = { first
                 , second
                 , both
                 , split
                 };
