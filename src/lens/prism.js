'use strict';

const { curry }          = require('../curry'),
      { equals }         = require('../equals'),
      { id }             = require('../id'),
      { left, right }    = require('./profunctor/class/choice'),
      { dimap, rmap }    = require('./profunctor/class/profunctor'),
      { Market }         = require('./profunctor/market'),
      { Tagged }         = require('./profunctor/tagged'),
      { Either, either } = require('../either'),
      { Maybe, maybe }   = require('../maybe'),
      { Unit }           = require('../monoid/unit'),
      { tuple2 }         = require('../tuple');

const prism = curry((to, from, pab) => dimap( from, (e => e.value)
                                            , right(rmap(to, pab))
                                            ));

const prismʹ = curry((to, from) => prism(to, s => {
    return maybe(Either.Left(s), Either.Right, from(s));
}));

const review = curry((p, r) => p(Tagged(r)).x);

const nearly = curry((x, f) => prismʹ( () => x
                                     , a => f(a) ? Maybe.of(Unit) : Maybe.empty()
                                     ));

const only = a =>  prismʹ( () => a
                         , x => equals(a, x) ? Maybe.of(Unit) : Maybe.empty()
                         );

const withPrism = curry((p, f) => {
    const m = p(Market(id, Either.Right));
    return f(m.to, m.from);
});

const aside = k => withPrism(k, (to, from) => {
    return prism( x => x.map(to)
                , es => {
                    return from(es.second()).bimap( t => tuple2(es.first(), t)
                                                  , a => tuple2(es.first(), a)
                                                  );
                });
});

const Leftʹ = left;

const Rightʹ = right;

const Nothingʹ = prism( () => Maybe.empty()
                      , maybe(Either.Right(Unit), () => Either.Left(Maybe.empty()))
                      );

const Justʹ = prism( Maybe.of
                   , maybe(Either.Left(Maybe.empty()), Either.Right)
                   );

module.exports = { prism
                 , prismʹ
                 , review
                 , nearly
                 , only
                 , withPrism
                 , aside
                 , Leftʹ
                 , Rightʹ
                 , Nothingʹ
                 , Justʹ
                 };
