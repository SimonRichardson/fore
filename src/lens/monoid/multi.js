'use strict';

const { tagged } = require('../../cata');

const Multi = tagged('x');

Multi.of = x => Multi(x);

Multi.empty = () => Multi(1);

Multi.prototype.concat = function(x) {
    return Multi(this.x * x.x);
};

module.exports = { Multi
                 };
