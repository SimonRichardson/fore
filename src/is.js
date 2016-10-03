'use strict';

const { curry } = require('./curry');

const isTypeOf = curry((s, o) => typeof o === s);

const isBoolean = isTypeOf('boolean');

const isFunction = isTypeOf('function');

const isNumber = isTypeOf('number');

const isString = isTypeOf('string');

const isEqualTo = curry((v, o) => v === o);

const isNull = isEqualTo(null);

const isUndefined = isEqualTo(undefined);

module.exports = { isTypeOf
                 , isBoolean
                 , isFunction
                 , isNumber
                 , isString
                 , isEqualTo
                 , isNull
                 , isUndefined
                 };
