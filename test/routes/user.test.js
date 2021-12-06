const request = require('supertest');
const jwt = require('jwt-simple');

const app = require('../../src/app');

const mail = `${Date.now()}@email.com`;

let user;

beforeAll(async () => {
  const res = await app.services.user.insert({ name: 'User Account', mail, passwd: '123456' });
  user = { ...res[0] };
  user.token = jwt.encode(user, 'secret');
});

describe('users', () => {
  it('Deve listar todos os usuários', async () => {
    const res = await request(app).get('/api/users').set('authorization', `bearer ${user.token}`);
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
  it('Deve inserir usuário com sucesso', async () => {
    const res = await request(app).post('/api/users').send({ name: 'Walter', mail: `${Date.now()}@email.com`, passwd: '123456' }).set('authorization', `bearer ${user.token}`);
    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Walter');
    expect(res.body).not.toHaveProperty('passwd');
  });
  it('Não deve inserir usuário sem nome', async () => {
    const res = await request(app).post('/api/users').send({ mail, passwd: '123456' }).set('authorization', `bearer ${user.token}`);
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Name is required field');
  });
  it('Não deve inserir usuário sem e-mail', async () => {
    const res = await request(app).post('/api/users').send({ name: 'Walter Mitty', passwd: '123456' }).set('authorization', `bearer ${user.token}`);
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Email is required field');
  });
  it('Não deve inserir usuário sem senha ', async () => {
    const res = await request(app).post('/api/users').send({ name: 'Walter Mitty', mail }).set('authorization', `bearer ${user.token}`);
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Password is required field');
  });
  it('Não deve inserir usuário com e-mail existente', async () => {
    const res = await request(app).post('/api/users').send({ name: 'Walter Mitty', mail: 'walter@email.com', passwd: '123456' }).set('authorization', `bearer ${user.token}`);
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Email already registered');
  });
  it('Deve armazenar senha criptografada', async () => {
    const res = await request(app).post('/api/users').send({ name: 'Walter Mitty', mail: `${Date.now()}@mail.com`, passwd: '123456' }).set('authorization', `bearer ${user.token}`);
    expect(res.status).toBe(201);

    const { id } = res.body;
    const userDb = await app.services.user.getById(id);
    expect(userDb.passwd).not.toBeUndefined();
    expect(userDb.passwd).not.toBe('123456');
  });
});
