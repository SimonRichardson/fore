'use strict';

const { tagged }            = require('../../cata'),
      { compose, identity } = require('../../../combinators');

const Endo = tagged('x');

Endo.empty = () => Endo(identity);

Endo.prototype.concat = function(x) {
    return Endo(compose(this.x, x.x));
};

module.exports = { Endo
                 };
