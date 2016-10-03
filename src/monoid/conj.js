'use strict';

const { tagged } = require('../tagged');

const Conj = tagged('x');

Conj.of = x => Conj(x);

Conj.empty = () => Conj(true);

Conj.prototype.concat = function(x) {
    return Conj(this.x && x.x);
};

module.exports = { Conj
                 };
