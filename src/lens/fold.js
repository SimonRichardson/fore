'use strict';

const { curry }       = require('../curry'),
      { map }         = require('../map'),
      { id }          = require('../id'),
      { compose }     = require('../compose'),
      { constant }    = require('../constant'),
      { equals }      = require('../equals'),
      { not }         = require('../not'),
      { flip }        = require('../flip'),
      { prepend }     = require('../prepend'),
      { Maybe }       = require('../maybe'),
      { Either }      = require('../either'),
      { Additive }    = require('../monoid/additive'),
      { Multi }       = require('../monoid/multi'),
      { Conj }        = require('../monoid/conj'),
      { Disj }        = require('../monoid/disj'),
      { Dual }        = require('../monoid/dual'),
      { Endo }        = require('../monoid/endo'),
      { First }       = require('../monoid/first'),
      { Last }        = require('../monoid/last'),
      { right, left } = require('./profunctor/class/choice'),
      { dimap }       = require('./profunctor/class/profunctor'),
      { Forget }      = require('./profunctor/forget');

const apR = curry((lap, rap) => map(_ => id, lap).ap(rap));

const foldMapOf = curry((M, p, f, s) => p(Forget(M)(f)).x(s));

const foldOf = curry((M, p, s) => p(Forget(M)(id).x(s)));

const preview = curry((p, s) => foldMapOf(First, p, compose(First, Maybe.Just), s).x);

const foldrOf = curry((p, f, r, s) => foldMapOf(Endo, p, x => Endo(f(x)), s).x(r));

const DE = Dual(Endo)

const foldlOf = curry((p, f, r, s) => foldMapOf(DE, p, compose(DE, Endo, flip(f)), s).x.x(r));

const allOf = curry((p, f, s) => foldMapOf(Conj, p, compose(Conj, f), s).x);

const anyOf = curry((p, f, s) => foldMapOf(Disj, p, compose(Disj, f), s).x);

const andOf = curry((p, s) => allOf(p, id, s));

const orOf = curry((p, s) => anyOf(p, id, s));

const elemOf = curry((p, a, s) => anyOf(p, equals(a), s));

const notElemOf = curry((p, a, s) => anyOf(p, x => not(equals(a, x), s)));

const sumOf = curry((p, s) => foldMapOf(Additive, p, Additive, s).x);

const productOf = curry((p, s) => foldMapOf(Multi, p, Multi, s).x);

const lengthOf = curry((p, s) => foldMapOf(Additive, p, constant(Additive.of(1)), s).x);

const firstOf = curry((p, s) => foldMapOf(First, p, compose(First, Maybe.Just), s).x);

const lastOf = curry((p, s) => foldMapOf(Last, p, compose(Last, Maybe.Just), s).x);

const findOf = curry((p, f, s) => foldlOf(p, curry((m, a) => m.fold(constant(m), () => {
    return f(a) ? Maybe.of(a) : Maybe.empty();
})), Maybe.empty(), s));

const sequenceOf = curry((M, p, s) => foldMapOf(Endo, p, compose(Endo, apR), s).x(M.of(Unit)));

const toArrayOf = curry((p, s) => foldrOf(p, prepend, [], s));

const has = curry((p, s) => foldMapOf(Disj, p, constant(Disj(true)), s).x);

const hasnʹt = curry((p, s) => foldMapOf(Conj, p, constant(Conj(false)), s).x);

const filtered = curry((f, c) => dimap( x => f(x) ? Either.Right : Either.Left
                                      , e => e.bimap(id, id)
                                      , right(c)
                                      ));

module.exports = { foldMapOf
                 , foldOf
                 , preview
                 , foldrOf
                 , foldlOf
                 , allOf
                 , anyOf
                 , andOf
                 , orOf
                 , elemOf
                 , notElemOf
                 , sumOf
                 , productOf
                 , lengthOf
                 , firstOf
                 , lastOf
                 , findOf
                 , sequenceOf
                 , toArrayOf
                 , has
                 , hasnʹt
                 , filtered
                 };
