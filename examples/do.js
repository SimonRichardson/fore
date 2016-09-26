'use strict';

const { doʹ, ofʹ } = require('../src/free/do'),
      { dispatch } = require('../src/free/interpret'),
      { Just, Nothing } = require('../src/free/maybe'),

      { tagged } = require('../src/cata'),
      { identity } = require('../src/combinators'),

      Maybe = require('../src/maybe');

const error = () => { throw new TypeError('Expected Just'); }

const IOTask = tagged('unsafePerform');

IOTask.of = x => IOTask(f => f(x));
IOTask.prototype.fold = function(f) {
    return IOTask(res => {
        return this.unsafePerform(a => res(f(a)));
    });
};
IOTask.prototype.chain = function(f) {
    return IOTask(res => {
        return this.unsafePerform(a => {
            return f(a).unsafePerform(res);
        });
    });
};

const app = doʹ(function *() {
    const a = yield Just(1);
    const b = yield Just(2);
    return ofʹ(a + b);
});

const NT = m => m.fold(IOTask.of, error);

const runApp = dispatch([ [Maybe, NT] ]);

app.foldMap(runApp, IOTask.of).unsafePerform(console.log);
