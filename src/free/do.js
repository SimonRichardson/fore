'use strict';

const { Free, cauchy } = require('./free');

const doʹ = gen => Free.Impure(cauchy, () => {
    const g = gen(),
          step = value => {
              const result = g.next(value);
              return result.done
                ? result.value
                : result.value.chain(step);
          };
    return step();
});

const ofʹ = Free.of;

module.exports = { doʹ
                 , ofʹ
                 };
