module.exports = {
  development: {
    username: 'postgres',
    password: 'root',
    database: 'todo',
    host: '127.0.0.1',
    dialect: 'postgres',
    migrationStorage: 'json',
    seederStorage: 'json',
  },
  test: {},
  production: {},
};
