const request = require('supertest');
const jwt = require('jwt-simple');
const app = require('../../src/app');

const MAIN_ROUTE = '/api/accounts';

let user;
let user2;

beforeEach(async () => {
  const res = await app.services.user.insert({
    name: 'User account',
    mail: `${Date.now()}@mail.com`,
    passwd: '123456',
  });

  user = { ...res[0] };
  user.token = jwt.encode(user, 'secret');

  const res2 = await app.services.user.insert({
    name: 'User account',
    mail: `${Date.now()}@mail.com`,
    passwd: '123456',
  });

  user2 = { ...res2[0] };
});

describe('accounts', () => {
  it('Deve inserir uma conta com sucesso', async () => {
    const res = await request(app).post(MAIN_ROUTE).send({ name: 'CC1' }).set('authorization', `bearer ${user.token}`);
    expect(res.status).toBe(201);
    expect(res.body.name).toBe('CC1');
  });
  it('Não deve inserir uma conta sem nome', async () => {
    const res = await request(app).post(`${MAIN_ROUTE}`).send({}).set('authorization', `bearer ${user.token}`);
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Name is required field');
  });
  it('Deve retornar uma conta por Id', async () => {
    const acc = await app.db('accounts').insert({ name: 'CC By Id', user_id: user.id }, ['id']);
    const res = await request(app).get(`${MAIN_ROUTE}/${acc[0].id}`).set('authorization', `bearer ${user.token}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('CC By Id');
    expect(res.body.user_id).toBe(user.id);
  });
  it('Deve alterar uma conta com sucesso', async () => {
    const acc = await app.db('accounts').insert({ name: 'CC to Update', user_id: user.id }, ['id']);
    const res = await request(app).put(`${MAIN_ROUTE}/${acc[0].id}`).send({ name: 'Acc Updated' }).set('authorization', `bearer ${user.token}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Acc Updated');
  });
  it('Deve remover uma conta com sucesso', async () => {
    const acc = await app.db('accounts').insert({ name: 'CC to Remove', user_id: user.id }, ['id']);
    const res = await request(app).delete(`${MAIN_ROUTE}/${acc[0].id}`).set('authorization', `bearer ${user.token}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('CC successfully removed');
  });
  it('Deve listar apenas as contas do usuário', async () => {
    await app.db('accounts').insert([
      { name: 'Acc User #1', user_id: user.id },
      { name: 'Acc User #2', user_id: user2.id },
    ]);
    const res = await request(app).get(MAIN_ROUTE).set('authorization', `bearer ${user.token}`);
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe('Acc User #1');
  });
});
