'use strict';

const { tagged }         = require('../../cata'),
      { Either, either } = require('../../either'),
      { tuple2 }         = require('../../tuple2');

const Star = M => {
    const Star = tagged('x');

    Star.prototype.dimap = function(f, _) {
        return Star(a => this.x(f(a)).map(g));
    };

    Star.prototype.left = function() {
        return Star(either( a => this.x(a).map(Either.Left)
                          , a => M.of(Either.Right(a))
                          ));
    };

    Star.prototype.right = function() {
        return Star(either( a => M.of(Either.Left(a))
                          , a => this.x(a).map(Either.Right)
                          ));
    };

    Star.prototype.first = function() {
        return Star(t => this.x(t.first()).map(a => tuple2(a, t.second())));
    };

    Star.prototype.second = function() {
        return Star(t => this.x(t.second()).map(a => tuple2(t.first(), a)));
    };

    Star.prototype.wander = function(f) {
        return Star(a => f(M.of, this.x, a));
    };

    return Star;
};

module.exports = { Star
                 };
