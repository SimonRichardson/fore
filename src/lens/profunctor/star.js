'use strict';

const { tagged }         = require('../../tagged'),
      { Either, either } = require('../../either'),
      { map }            = require('../../map'),
      { tuple2 }         = require('../../tuple2');

const Star = M => {
    const Star = tagged('x');

    Star.prototype.dimap = function(f, _) {
        return Star(a => map(g, compose(this.x, f)));
    };

    Star.prototype.left = function() {
        return Star(either( a => map(Either.Left, this.x(a))
                          , a => M.of(Either.Right(a))
                          ));
    };

    Star.prototype.right = function() {
        return Star(either( a => M.of(Either.Left(a))
                          , a => map(Either.Right, this.x(a))
                          ));
    };

    Star.prototype.first = function() {
        return Star(t => map(a => tuple2(a, t.second()), this.x(t.first())));
    };

    Star.prototype.second = function() {
        return Star(t => map(a => tuple2(t.first(), a), this.x(t.second())));
    };

    Star.prototype.wander = function(f) {
        return Star(a => f(M.of, this.x, a));
    };

    return Star;
};

module.exports = { Star
                 };
