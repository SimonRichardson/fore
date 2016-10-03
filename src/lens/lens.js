'use strict';

const { curry }         = require('../curry'),
      { dimap }         = require('./profunctor/class/profunctor'),
      { first, second } = require('./profunctor/class/strong'),
      { Maybe }         = require('../maybe'),
      { tuple2 }        = require('../tuple'),
      { assoc }         = require('../assoc'),
      { dissoc }        = require('../dissoc'),
      { has }           = require('../has');

const lensʹ = curry((to, pab) => dimap( to
                                      , t => t.second()(t.first())
                                      , first(pab)
                                      ));

const lens = curry((getter, setter) => lensʹ(s => tuple2( getter(s)
                                                        , b => setter(b, s)
                                                        )));

const _1 = first;

const _2 = second;

const access = k => lens( obj => has(k, obj) ? Maybe.of(obj[k]) : Maybe.empty()
                        , (m, obj) => m.fold( x => assoc(k, x, obj)
                                            , () => dissoc(k, obj)
                                            )
                        );

module.exports = { lensʹ
                 , lens
                 , _1
                 , _2
                 , access
                 };
