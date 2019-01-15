const path = require('path');

module.exports = {
  development: {
    client: 'pg',
    connection:
      process.env.DATABASE_URL,
    migrations: {
      directory: path.resolve(__dirname, './migrations')
    },
    seeds: {
      directory: path.resolve(__dirname, './seeds')
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: path.resolve(__dirname, './migrations')
    },
    pool: {
      max: Number(process.env.DB_POOL_MAX) || 5,
      min: Number(process.env.DB_POOL_MIN) || 2
    },
    seeds: {
      directory: path.resolve(__dirname, './seeds')
    }
  },
  test: {
    client: 'pg',
    connection:
      process.env.DATABASE_URL,
    migrations: {
      directory: path.resolve(__dirname, './migrations')
    },
    seeds: {
      directory: path.resolve(__dirname, './seeds')
    }
  }
};
