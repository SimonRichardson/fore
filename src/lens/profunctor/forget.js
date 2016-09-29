'use strict';

const { compose, identity } = require('../../../combinators'),
      { tagged }            = require('../../cata'),
      { Either, either }    = require('../../either'),
      { Const }             = require('./../const');

const Forget = M => {
    const Forget = tagged('x');

    Forget.prototype.dimap = function(f, _) {
        return Forget(compose(this.x, f));
    };

    Forget.prototype.left = function() {
        return Forget(either(this.x, () => M.empty()));
    };

    Forget.prototype.right = function() {
        return Forget(either(() => M.empty(), this.x));
    };

    Forget.prototype.first = function() {
        return Forget(x => this.x(x.first()));
    };

    Forget.prototype.second = function() {
        return Forget(x => this.x(x.second()));
    };

    Forget.prototype.wander = function(f) {
        return Forget(s => f(Const(M).of, x => Const(M)(z(x)), s).x);
    };

    return Forget;
};

module.exports = { Forget
                 };
