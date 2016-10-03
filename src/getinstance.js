'use strict';

function getInstance(self, constructor) {
    return self instanceof constructor ? self : Object.create(constructor.prototype);
}

module.exports = { getInstance
                 };
