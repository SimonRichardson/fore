'use strict';

const { tagged }  = require('../../tagged'),
      { compose } = require('../../compose');

const Exchange = tagged(['to', 'from']);

Exchange.prototype.dimap = function(f, g) {
    return Exchange(compose(this.to, f), compose(g, this.from));
};

module.exports = { Exchange
                 };
