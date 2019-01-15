import { createServer } from '../lib/server';
import * as http from 'http';
import { connect as connectDb, destroy } from '../db';

const getTestApp = (): http.Server => {
  return createServer().listen();
};

const initializeDB = async () => {
  const connection = connectDb();
  await connection.migrate.latest();
};

const closeDB = async () => {
  const connection = connectDb();
  await connection('example').del();
  await destroy();
};

export { getTestApp, initializeDB, closeDB };
