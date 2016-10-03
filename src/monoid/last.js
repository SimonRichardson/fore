'use strict';

const { tagged } = require('../tagged'),
      { Maybe }  = require('../maybe');


const Last = tagged('x')

Last.empty = () => Last(Maybe.Nothing);

Last.prototype.concat = function(x) {
    return this.x.fold(() => x, () => Last(this.x));
};

module.exports = { Last
                 };
