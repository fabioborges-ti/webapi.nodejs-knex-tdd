const ValidationError = require('../errors/ValidationError');

module.exports = (app) => {
  async function get() {
    const res = await app.db('accounts');
    return res;
  }

  async function getById(id) {
    const res = await app.db('accounts').where({ id }).first();
    return res;
  }

  async function getByUserId(userId) {
    const res = await app.db('accounts').where({ user_id: userId });
    return res;
  }

  async function insert(account) {
    if (!account.name) throw new ValidationError('Name is required field');
    const accountExists = await app.db('accounts').where({ name: account.name, user_id: account.user_id }).first();
    if (accountExists) throw new ValidationError('There is already an account with the same name');
    const res = await app.db('accounts').insert(account, '*');
    return res;
  }

  async function update(id, account) {
    const res = await app.db('accounts').update({ name: account.name }, '*').where('id', id);
    return res;
  }

  async function remove(id) {
    const res = await app.db('accounts').del().where('id', id);
    return res;
  }

  return {
    get, getById, getByUserId, insert, update, remove,
  };
};
