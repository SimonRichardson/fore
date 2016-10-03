'use strict';

const { has }      = require('./fold'),
      { review }   = require('./prism'),
      { Maybe }    = require('../maybe'),
      { Re }       = require('./profunctor/re'),
      { Exchange } = require('./profunctor/exchange'),
      { dimap }    = require('./profunctor/class/profunctor'),
      { Unit }     = require('../monoid/unit'),
      { id }       = require('../id'),
      { compose }  = require('../compose');

const iso = dimap;

const re = p => p(Re(id)).x;

const withIso = curry((p, f) => {
    const ex = p(Exchange(id, id));
    return f(ex.to, ex.from);
});

const under = curry((p, ts, b) => withIso(p, (sa, bt) => compose(sa, compose(ts, bt, b))));

const nonʹ = p => iso( m => m.fold(id, review(p, Unit))
                     , b => has(p, b) ? Maybe.empty() : Maybe.of(b)
                     );

const non = compose(nonʹ, only);

module.exports = { iso
                 , re
                 , withIso
                 , under
                 , nonʹ
                 , non
                 };
