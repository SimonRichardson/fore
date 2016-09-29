'use strict';

const { compose, identity } = require('../../../combinators'),
      { tagged }            = require('../../cata');

const Market = tagged('to', 'from');

Market.prototype.map = function(f) {
    return Market(compose(f, this.to), s => this.from(s).bimap(f, identity));
};

Market.prototype.dimap = function(f, g) {
    return Market(compose(g, this.to), s => this.from(f(s)).bimap(g, identity));
};

Market.prototype.left = function() {
    return Market(compose(Either.Left, this.to), either( a => this.from(a).bimap(Either.Left, identity)
                                                       , compose(Either.Left, Either.Right)
                                                       ));
};

Market.prototype.right = function() {
    return Market(compose(Either.Right, this.to), either( compose(Either.Left, Either.Left)
                                                        , b => this.from(b).bimap(Either.Right, identity)
                                                        ));
};

module.exports = { Market
                 };
