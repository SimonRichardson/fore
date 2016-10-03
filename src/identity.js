'use strict';

const { tagged } = require('./tagged');

const Identity = tagged('x');

Identity.of = x => Identity(x);

Identity.prototype.map = function(f) {
    return this.chain(x => Identity(f(this.x)));
};

Identity.prototype.chain = function(f) {
    return f(this.x);
};

module.exports = { Identity
                 };
