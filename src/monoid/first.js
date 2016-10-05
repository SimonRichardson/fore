'use strict';

const { tagged }   = require('../tagged'),
      { constant } = require('../constant'),
      { Maybe }    = require('../maybe');


const First = tagged('x')

First.empty = () => First(Maybe.Nothing);

First.prototype.concat = function(x) {
    return this.x.fold(_ => First(this.x), constant(x));
};

module.exports = { First
                 };
