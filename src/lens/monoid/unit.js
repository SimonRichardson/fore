'use strict';

const { tagged } = require('../../cata');

const Unit = tagged('x');

const unit = Unit({});

Unit.empty = () => unit;

Unit.prototype.concat = function() {
    return Unit.empty();
};

module.exports = { Unit
                 };

