'use strict';

const { doʹ, ofʹ } = require('../src/free/do'),
      { dispatch } = require('../src/free/interpret'),
      { Maybe, Just, Nothing } = require('../src/free/maybe'),

      { tagged } = require('../src/cata'),
      { identity } = require('../src/combinators');

const Task = tagged('fork');

Task.of = x => Task(f => f(x));
Task.empty = () => Task(identity);

Task.prototype.fold = function(f, g) {
    return Task(res => {
        return this.fork(a => res(f(a)));
    });
};

const app = doʹ(function *() {
    const maybeNumber = yield Just(2);
    return ofʹ(maybeNumber);
})

const runApp = dispatch([ [Maybe, m => m.fold(Task.of, console.log)] ]);

app.foldMap(runApp, Task.of).fork(console.log);
