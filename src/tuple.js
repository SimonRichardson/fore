'use strict';

const { tagged }   = require('./cata'),
      { curry }    = require('./curry'),
      { identity } = require('./combinators');

const Tuple = tagged('_1', '_2');

Tuple.prototype.dimap = function(f, g) {
    return Tuple(f(this._1), g(this._2));
};

Tuple.prototype.map = function(f) {
    return this.dimap(identity, f);
};

Tuple.prototype.curry = function(f) {
    return f(this);
};

Tuple.prototype.uncurry = function(f) {
    return f(this._1, this._2);
};

Tuple.prototype.extend = function(f) {
    return this.map(f);
};

Tuple.prototype.extract = function() {
    return this._2;
};

const tuple2 = curry((a, b)         => Tuple(a, b)),
      tuple3 = curry((a, b, c)      => Tuple(tuple2(a, b), c)),
      tuple4 = curry((a, b, c, d)   => Tuple(tuple3(a, b, c), d))

module.exports = { tuple2
                 , tuple3
                 , tuple4
                 };
