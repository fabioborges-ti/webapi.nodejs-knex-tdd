const express = require('express');

const router = express.Router();

module.exports = (app) => {
  router.get('/', async (req, res, next) => {
    try {
      const result = await app.services.account.getByUserId(req.user.id);
      return res.status(200).json(result);
    } catch (err) {
      return next(err);
    }
  });

  router.get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await app.services.account.getById(id);
      if (result.user_id !== req.user.id) { return res.status(403).json({ error: 'Unauthorized resource' }); }
      return res.status(200).json(result);
    } catch (err) {
      return next(err);
    }
  });

  router.post('/', async (req, res, next) => {
    try {
      const result = await app.services.account.insert({ ...req.body, user_id: req.user.id });
      if (result.error) return res.status(400).json(result);
      return res.status(201).json(result[0]);
    } catch (err) {
      return next(err);
    }
  });

  router.put('/:id', async (req, res, next) => {
    try {
      const result = await app.services.account.update(req.params.id, req.body);
      return res.status(200).json(result[0]);
    } catch (err) {
      return next(err);
    }
  });

  router.delete('/:id', async (req, res, next) => {
    try {
      await app.services.account.remove(req.params.id);
      return res.status(200).json({ message: 'CC successfully removed' });
    } catch (err) {
      return next(err);
    }
  });

  return router;
};
