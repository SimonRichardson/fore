'use strict';

const { curry }     = require('../../../curry'),
      { Identity }  = require('../../../Identity');

const wander = curry((t, p) => {
    return isFunction(p.wander) ? p.wander(t) :
        s => t(Identity, a => Identity(p(a)), s).value;
});

module.exports = { wander
                 };
