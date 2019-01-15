// import env first so process.env is available in the rest of the app
import './lib/env';
import { connect as connectDb } from './db';
import { createServer } from './lib/server';

try {
  createServer().listen(process.env.PORT, () => {
    const mode = process.env.NODE_ENV || 'development';
    console.log(`Server listening on ${process.env.PORT} in ${mode} mode`);
  });

  // connect to db
  try {
    connectDb();
  } catch (ex) {
    console.log('db connection error');
  }
} catch (err) {
  console.error('Error while starting up server', err);
  process.exit(1);
}
