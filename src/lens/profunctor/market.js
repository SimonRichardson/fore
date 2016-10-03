'use strict';

const { compose } = require('../../compose'),
      { id }      = require('../../id'),
      { tagged }  = require('../../tagged');

const Market = tagged('to', 'from');

Market.prototype.map = function(f) {
    return Market(compose(f, this.to), s => this.from(s).bimap(f, id));
};

Market.prototype.dimap = function(f, g) {
    return Market(compose(g, this.to), s => this.from(f(s)).bimap(g, id));
};

Market.prototype.left = function() {
    return Market( compose(Either.Left, this.to)
                 , either( a => this.from(a).bimap(Either.Left, id)
                         , compose(Either.Left, Either.Right)
                         ));
};

Market.prototype.right = function() {
    return Market( compose(Either.Right, this.to)
                 , either( compose(Either.Left, Either.Left)
                         , b => this.from(b).bimap(Either.Right, id)
                         ));
};

module.exports = { Market
                 };
