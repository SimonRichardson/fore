'use strict';

const { liftF } = require('./free'),
      Eitherʹ   = require('../either');

const Left = x => liftF(Eitherʹ.Left(x)),
      Right = x => liftF(Eitherʹ.Right(x));

const Either = { of: Just
               };

module.exports = { Either
                 , Left
                 , Right
                 };
