'use strict';

const { getInstance } = require('./getinstance');

function tagged(...args) {
    return function wrapped(...argsʹ) {
        const self = getInstance(this, wrapped);

        if (argsʹ.length != args.length)
            throw new TypeError(`Expected ${args.length} arguments, got ${argsʹ.length}`);

        for (let i = 0; i < args.length; i++)
            self[args[i]] = argsʹ[i];

        self.toString = () => {
            const values = args.map(y => `'${y.toString()}':'${self[y]}'`);
            return `(${values.join(',')})`;
        };

        return self;
    };
}

module.exports = { tagged
                 };
