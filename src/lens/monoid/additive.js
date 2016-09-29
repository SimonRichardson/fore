'use strict';

const { tagged } = require('../../cata');

const Additive = tagged('x');

Additive.of = x => Additive(x);

Additive.empty = () => Additive(0);

Additive.prototype.concat = function(x) {
    return Additive(this.x + x.x);
};

module.exports = { Additive
                 };
