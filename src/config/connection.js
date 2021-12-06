module.exports = {
  test: {
    client: 'pg',
    version: '10',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: 'aline123',
      database: 'barriga',
    },
    migrations: {
      directory: '../../src/database/migrations',
    },
  },
};
