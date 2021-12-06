const request = require('supertest');
const app = require('../../src/app');

describe('auth', () => {
  it('Deve criar usuário via signup', async () => {
    const res = await request(app).post('/auth/signup').send({ name: 'Walter', mail: `${Date.now()}@mail.com`, passwd: '123456' });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Walter');
    expect(res.body).toHaveProperty('mail');
    expect(res.body).not.toHaveProperty('passwd');
  });
  it('Deve receber token ao logar', async () => {
    const mail = `${Date.now()}@mail.com`;
    await app.services.user.insert({ name: 'Walter', mail, passwd: '123456' });
    const res = await request(app).post('/auth/signin').send({ mail, passwd: '123456' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
  it('Não deve autenticar usuário não cadastrado', async () => {
    const res = await request(app).post('/auth/signin').send({ mail: 'notfound@mail.com', passwd: '123456' });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('unauthorized user');
  });
  it('Não deve autenticar usuário com senha errada', async () => {
    const mail = `${Date.now()}@mail.com`;
    await app.services.user.insert({ name: 'Walter', mail, passwd: '123456' });
    const res = await request(app).post('/auth/signin').send({ mail, passwd: '654321' });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('unauthorized user');
  });
  it('Não deve acessar uma rota protegida sem token', async () => {
    const res = await request(app).get('/api/users');
    expect(res.status).toBe(401);
  });
});
