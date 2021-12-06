const express = require('express');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');
const ValidationError = require('../errors/ValidationError');

const router = express.Router();

const secret = 'secret';

module.exports = (app) => {
  router.post('/signin', async (req, res, next) => {
    try {
      const { mail, passwd } = req.body;
      const user = await app.services.user.getByEmail(mail);
      if (!user) {
        throw new ValidationError('unauthorized user');
      }
      if (!bcrypt.compareSync(passwd, user.passwd)) {
        throw new ValidationError('unauthorized user');
      }
      const payload = {
        id: user.id,
        name: user.name,
        mail: user.mail,
      };
      const token = jwt.encode(payload, secret);
      return res.status(200).json({ token });
    } catch (err) {
      return next(err);
    }
  });

  router.post('/signup', async (req, res, next) => {
    try {
      const result = await app.services.user.insert(req.body);
      return res.status(201).json(result[0]);
    } catch (err) {
      return next(err);
    }
  });

  return router;
};
