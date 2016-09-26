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
    const fork = this.unsafePerform;
    return IOTask(res => {
        return fork(a => res(f(a)));
    });
};

const app = doʹ(function *() {
    const a = yield Just(1);
    const b = yield Just(2);
    return ofʹ(a + b);
});

const NTMaybeToIOTask = m => m.fold(IOTask.of, error);

const runApp = dispatch([ [Maybe, NTMaybeToIOTask ] ]);

app.foldMap(runApp, IOTask.of).unsafePerform(console.log);
app.foldMap(runApp, IOTask.of).unsafePerform(console.log);
