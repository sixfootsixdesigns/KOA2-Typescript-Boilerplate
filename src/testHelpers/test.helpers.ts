import { createApp } from '../app';
import { Connection, createConnection } from 'typeorm';
import { ExampleEntity } from '../entity';
import { Server } from 'http';

let server: Server;
let db: Connection;

export const getTestApp = async (): Promise<Server> => {
  if (!db) {
    db = await createConnection();
  }
  if (server) {
    return server;
  }
  server = createApp().listen();
  return server;
};

export const closeTestApp = async () => {
  await cleanUpData();

  if (db) {
    await db.close();
    db = null;
  }

  if (server) {
    server.close();
    server = null;
  }
};

export const cleanUpData = async () => {
  await ExampleEntity.clear();
};
