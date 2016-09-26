'use strict';

const { taggedSum } = require('../cata');

const Free = taggedSum({ Impure : ['x', 'f']
                       , Pure   : ['x']
                       });

Free.of = Free.Pure;

Free.prototype.fold = function(...args) {
    return this.x.fold.apply(this.x, args);
};

Free.prototype.map = function(f) {
    return this.cata({ Impure: (x, g) => Free.Impure(x, y => g(y).map(f))
                     , Pure: x => Free.Pure(f(x))
                     });
};

Free.prototype.ap = function(a) {
    return this.cata({ Impure: (x, g) => Free.Impure(x, y => g(y).ap(a))
                     , Pure: f => a.map(f)
                     });
};

const kleisli = (f, g) => x => f(x).chain(g);

Free.prototype.chain = function(f) {
    return this.cata({ Impure: (x, g) => Free.Impure(x, kleisli(g, f))
                     , Pure: x => f(x)
                     });
};

const cauchy = {};

Free.prototype.foldMap = function(interpreter, of) {
    return this.cata({ Pure: a => of(a)
                     , Impure: (arg, next) => {
                        return arg === cauchy
                            ? next().foldMap(interpreter, of)
                            : interpreter(arg).chain(result =>
                                next(result).foldMap(interpreter, of))
                     }});
};

const liftF = x => Free.Impure(x, Free.Pure);

module.exports = { liftF
                 , Free
                 , cauchy
                 };
