'use strict';

const { tagged } = require('../../cata'),
      { dimap }  = require('./class/profunctor');

const Re = tagged('x');

Re.prototype.dimap = function(f, g) {
    return Re(p => this.x(dimap(g, f, p)));
};

module.exports = { Re
                 };
