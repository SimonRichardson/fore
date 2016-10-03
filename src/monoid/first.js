'use strict';

const { tagged } = require('../tagged'),
      { Maybe }  = require('../maybe');


const First = tagged('x')

First.empty = () => First(Maybe.Nothing);

First.prototype.concat = function(x) {
    return this.x.fold(x => First(this.x), () => x);
};

module.exports = { First
                 };
