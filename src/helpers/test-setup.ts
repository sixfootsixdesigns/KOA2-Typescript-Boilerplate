import { createServer } from '../lib/server';
import * as http from 'http';
import { connect as connectDb, destroy } from '../db';
let app: http.Server;

const getTestApp = async (): Promise<http.Server> => {
  if (!app) {
    app = createServer().listen();
    initializeDB();
  }
  return app;
};

const closeApp = async () => {
  await closeDB();
  if (app) {
    app.close();
  }
  app = null;
};

const initializeDB = () => {
  connectDb();
};

const closeDB = async () => {
  const connection = connectDb();
  await connection('example').del();
  await destroy();
};

export { getTestApp, closeApp };
