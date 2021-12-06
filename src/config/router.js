const express = require('express');

const protectedRouter = express.Router();

module.exports = (app) => {
  app.use('/auth', app.routes.auth);

  protectedRouter.use('/users', app.routes.users);
  protectedRouter.use('/accounts', app.routes.accounts);

  app.use('/api', app.config.passport.authenticate(), protectedRouter);
};
