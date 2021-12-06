const express = require('express');

const router = express.Router();

module.exports = (app) => {
  router.get('/', async (req, res, next) => {
    try {
      const result = await app.services.user.get();
      return res.status(200).json(result);
    } catch (err) {
      return next(err);
    }
  });

  router.post('/', async (req, res, next) => {
    try {
      const result = await app.services.user.insert(req.body);
      return res.status(201).json(result[0]);
    } catch (err) {
      return next(err);
    }
  });

  return router;
};
