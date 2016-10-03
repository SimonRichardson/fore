'use strict';

const { tagged } = require('../../tagged'),
      { dimap }  = require('./class/profunctor');

const Re = tagged('x');

Re.prototype.dimap = function(f, g) {
    return Re(p => this.x(dimap(g, f, p)));
};

module.exports = { Re
                 };
