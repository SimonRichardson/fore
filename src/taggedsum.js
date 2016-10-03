'use strict';

const { constant } = require('./combinators'),
      { tagged }   = require('./tagged');

function taggedSum(constructors) {
    function definitions() {
        throw new TypeError('Tagged sum was called instead of one of its properties.');
    }

    function make(key) {
        return function(dispatches) {
            const fields = constructors[key],
                  args = [];

            if (!dispatches[key])
                throw new TypeError(`Constructors given to cata didn't include: ${key}`);

            for (let i = 0; i < fields.length; i++)
                args.push(this[fields[i]]);

            return dispatches[key].apply(this, args);
        };
    }

    function makeProto(key) {
        const proto = Object.create(definitions.prototype);
        proto.cata = make(key);
        return proto;
    }

    for (let key in constructors) {
        if (!constructors[key].length) {
            definitions[key] = makeProto(key);
            definitions[key].toString = constant('()');
            continue;
        }
        const ctor = tagged.apply(null, constructors[key]);
        definitions[key] = ctor;
        definitions[key].prototype = makeProto(key);
    }

    return definitions;
}

module.exports = { taggedSum
                 };
