'use strict';

const { tagged } = require('../tagged');

const Disj = tagged('x');

Disj.of = x => Disj(x);

Disj.empty = () => Disj(false);

Disj.prototype.concat = function(x) {
    return Disj(this.x || x.x);
};

module.exports = { Disj
                 };
