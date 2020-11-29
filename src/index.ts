require('dotenv').config();
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { createApp } from './app';
import { Config } from './config';

createConnection()
  .then(() => {
    createApp().listen(Config.port(), () => {
      console.log(`app is listening on port ${Config.port()}`);
    });
  })
  .catch((ex) => {
    console.log('create connection error', ex);
  });
