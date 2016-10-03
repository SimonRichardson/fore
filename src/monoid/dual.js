'use strict';

const { tagged } = require('../tagged');

const Dual = M => {
    const Dual = tagged('x');

    Dual.of = x => Dual(x);

    Dual.empty = () => Dual(M.empty());

    Dual.prototype.concat = function(x) {
        return Dual(x.x.concat(this.x));
    };

    return Dual;
};

module.exports = { Dual
                 };
