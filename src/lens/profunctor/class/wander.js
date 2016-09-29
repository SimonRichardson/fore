'use strict';

const { curry }     = require('../../../curry'),
      { Identity }  = require('../../../Identity');

// wander :: Applicative f => ((a -> f a) -> (a -> f b) -> s -> f t) -> p a b -> p s t
const wander = curry((t, p) => {
    return isFunction(p.wander) ? p.wander(t) :
        s => t(Identity, a => Identity(p(a)), s).value;
});

module.exports = { wander
                 };
