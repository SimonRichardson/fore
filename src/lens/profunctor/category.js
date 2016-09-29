'use strict';

const { identity, compose }   = require('../../combinators'),
      { isFunction } = require('../../helpers');

const id = Category => isFunction(Category) ? identity : Category.id;

const composeʹ = curry((f, g) => isFunction(f.compose) ? f.compose(g) : compose(f, g));

const pipe = curry((f, g) => compose(g, f));

module.exports = { id
                 , compose: composeʹ
                 , pipe
                 };
