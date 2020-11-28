require('dotenv').config();
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { createApp } from './app';

const port = process.env.PORT || 3000;

createConnection()
  .then(() => {
    createApp().listen(port, () => {
      console.log(`app is listening on port ${port}`);
    });
  })
  .catch((ex) => {
    console.log('create connection error', ex);
  });
