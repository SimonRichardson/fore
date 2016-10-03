'use strict';

const { view }           = require('../../src/lens/getter'),
      { over, set }      = require('../../src/lens/setter'),
      { _1, _2, access } = require('../../src/lens/lens'),
      { compose }        = require('../../src/compose'),
      { tuple2 }         = require('../../src/tuple'),
      { Maybe }          = require('../../src/maybe');

const inc = x => x+1;

const foo = access('foo');

console.log(view(_2, tuple2('foo', 42)));                                // `42`
console.log(view(foo, { 'foo' : 1 }));                                   // `Just(1)`
console.log(set(_2, 42, tuple2('foo', 0)));                              // `tuple2('foo', 42)`
console.log(set(foo, Maybe.Just(5), { 'foo' : 1 }));                     // `{'foo':5}`
console.log(set(foo, Maybe.Nothing, { 'foo' : 1 }));                     // `{'foo':1}`
console.log(view(compose(_1, _2), tuple2(tuple2(true, 42), 'foo')));     // `42`
console.log(over(compose(_1, _2), inc, tuple2(tuple2(true, 42), 'foo'))) // `tuple2(tuple2(true, 43), 'foo')`
