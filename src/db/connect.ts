import * as knex from 'knex';
import * as knexConfig from './knexfile';

let connection: knex;
const dbConfig: knex.Config = knexConfig[process.env.NODE_ENV];

export const connect = (): knex => {
  if (!connection) {
    connection = knex(dbConfig);
  }
  return connection;
};

export const destroy = async (): Promise<void> => {
  if (connection) {
    await connection.destroy();
    connection = null;
  }
};
