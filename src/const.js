'use strict';

const { tagged } = require('./cata');

const Const = M => {
    const Const = tagged('x');

    Const.of = _ => Const(M.empty());
    Const.empty = () => Const(M.empty());

    Const.prototype.map = function(f) {
        return Const(this.x);
    };

    Const.prototype.chain = function(f) {
        return Const(this.x);
    };

    return Const;
};

module.exports = { Const
                 };
