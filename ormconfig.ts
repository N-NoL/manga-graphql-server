import { ConnectionOptions } from 'typeorm/connection/ConnectionOptions';

const config: ConnectionOptions = {
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: 'oleg14096',
  database: 'manga',
  entities: ['dist/**/*.entity{.ts,.js}'],
  subscribers: ['dist/**/*.subscriber{.ts,.js}'],
  synchronize: true,
};

export default config;
