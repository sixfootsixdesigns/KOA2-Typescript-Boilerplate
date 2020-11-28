require('dotenv').config();
const PostgressConnectionStringParser = require('pg-connection-string');
const connectionOptions = PostgressConnectionStringParser.parse(process.env.DATABASE_URL || '');

const base = process.env.NODE_ENV === 'production' ? './dist/' : './src/';

module.exports = {
  database: process.env.NODE_ENV === 'test' ? 'example_api_test' : connectionOptions.database || 'example_api',
  entities: [base + 'entity/**/*.entity.{js,ts}'],
  host: connectionOptions.host || 'localhost',
  logging: false,
  migrationsRun: true,
  migrations: [base + 'migration/*.{js,ts}'],
  password: connectionOptions.password || '',
  port: connectionOptions.port || 5432,
  synchronize: false,
  type: 'postgres',
  connectTimeoutMS: 5000,
  ssl: process.env.USE_DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  username: connectionOptions.user || '',
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};;
