'use strict';

const { tagged } = require('../../cata'),
      { Maybe }  = require('../../../maybe');


const Last = tagged('x')

Last.empty = () => Last(Maybe.Nothing);

Last.prototype.concat = function(x) {
    return this.x.fold(() => x, () => Last(this.x));
};

module.exports = { Last
                 };
