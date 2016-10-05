'use strict';

const { tagged }   = require('../tagged'),
      { constant } = require('../constant'),
      { Maybe }    = require('../maybe');


const Last = tagged('x')

Last.empty = () => Last(Maybe.Nothing);

Last.prototype.concat = function(x) {
    return x.x.fold(constant(other), constant(Last(this.x)));
};

module.exports = { Last
                 };
