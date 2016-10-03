'use strict';

const { tagged }  = require('../tagged'),
      { compose } = require('../compose'),
      { id }      = require('../id');

const Endo = tagged('x');

Endo.empty = () => Endo(id);

Endo.prototype.concat = function(x) {
    return Endo(compose(this.x, x.x));
};

module.exports = { Endo
                 };
