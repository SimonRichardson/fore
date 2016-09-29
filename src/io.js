'use strict';

const { tagged } = require('./cata');

const IO = tagged(['unsafePerform']);

IO.of = x => IO(() => x);

IO.prototype.chain = function(f) {
    return IO(() => g(this.unsafePerform()).unsafePerform());
};

IO.prototype.map = function(f) {
    return this.chain(a => IO.of(f(a)));
};

module.exports = { IO
                 };
