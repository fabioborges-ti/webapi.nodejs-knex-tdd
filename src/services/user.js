const bcrypt = require('bcrypt-nodejs');
const ValidationError = require('../errors/ValidationError');

function getHash(passwd) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(passwd, salt);
}

module.exports = (app) => {
  async function get() {
    const res = await app.db('users').select();
    return res;
  }

  async function getById(id) {
    const res = await app.db('users').where('id', id).first();
    return res;
  }

  async function getByEmail(mail) {
    const res = await app.db('users').where('mail', mail).first();
    return res;
  }

  async function insert(user) {
    if (!user.name) throw new ValidationError('Name is required field');
    if (!user.mail) throw new ValidationError('Email is required field');
    if (!user.passwd) throw new ValidationError('Password is required field');

    const userDb = await app.db('users').where('mail', user.mail);

    if (userDb?.length > 0) throw new ValidationError('Email already registered');

    const newUser = { ...user };

    newUser.passwd = getHash(user.passwd);

    const result = await app.db('users').insert(newUser, ['id', 'name', 'mail']);

    return result;
  }

  return {
    get, getById, getByEmail, insert,
  };
};
