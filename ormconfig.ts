import { ConnectionOptions } from 'typeorm/connection/ConnectionOptions';

function config(): ConnectionOptions {
  return {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: ['dist/**/*.entity{.ts,.js}'],
    subscribers: ['dist/**/*.subscriber{.ts,.js}'],
    synchronize: true,
  };
}
export default config;
