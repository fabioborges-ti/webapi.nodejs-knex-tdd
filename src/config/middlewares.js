const express = require('express');
// const knexLogger = require('knex-logger');

module.exports = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  // app.use(knexLogger(app.db));
};
