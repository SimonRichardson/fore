'use strict';

const { curry }     = require('../../../curry'),
      { compose }   = require('../../../compose'),
      { Identity }  = require('../../../Identity');

const wander = curry((t, p) => {
    return isFunction(p.wander) ? p.wander(t) :
        s => t(Identity, compose(Identity, p), s).x;
});

module.exports = { wander
                 };
