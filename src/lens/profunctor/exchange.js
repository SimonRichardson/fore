'use strict';

const { tagged } = require('../../tagged');

const Exchange = tagged(['to', 'from']);

Exchange.prototype.dimap = function(f, g) {
    return Exchange(s => this.to(f(s)), b => g(this.from(b)));
};

module.exports = { Exchange
                 };
