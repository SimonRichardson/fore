'use strict';

const { taggedSum } = require('../src/cata'),
      { identity, constant } = require('../src/combinators');

const Maybe = require('../src/maybe');

console.log(Maybe.Just(1));
console.log(Maybe.Just(1).toString());
console.log(Maybe.Just(1).cata({ Just: identity, Nothing: constant(2)}));
console.log(Maybe.Just(1).fold(identity, identity));

console.log(Maybe.Nothing);
console.log(Maybe.Nothing.toString());
console.log(Maybe.Nothing.cata({ Just: identity, Nothing: constant(2)}));
console.log(Maybe.Nothing.fold(identity, constant(2)));
