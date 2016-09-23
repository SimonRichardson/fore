'use strict';

function getInstance(self, constructor) {
    return self instanceof constructor ? self : Object.create(constructor.prototype);
}

function tagged(...args) {
    return function wrapped(...argsʹ) {
        const self = getInstance(this, wrapped);

        if (argsʹ.length != args.length)
            throw new TypeError(`Expected ${args.length} arguments, got ${argsʹ.length}`);

        for (let i = 0; i < args.length; i++)
            self[args[i]] = argsʹ[i];

        return self;
    };
}

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
            definitions[key] = make(key);
            continue;
        }
        const ctor = tagged.apply(null, constructors[key]);
        definitions[key] = ctor;
        definitions[key].prototype = make(key);
        definitions[key].prototype.constructor = ctor;
    }

    return definitions;
}

module.exports = { tagged
                 , taggedSum
                 };
