'use strict';

const update = curry((i, x, list) => {
    return i >= list.length ? list
                            : (() => {
                                const start = i < 0 ? 0 : i,
                                      slice = list.slice();
                                slice[start] = x;
                                return slice;
                              })()
});

module.exports = { update
                 };
