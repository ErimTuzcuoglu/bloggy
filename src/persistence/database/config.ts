import { Post, User } from '@domain/entities';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

const migrationsDir = join(__dirname, '../migrations');

const DBConfig = (): TypeOrmModuleOptions => {
  const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

  return {
    type: 'postgres',
    host: DB_HOST,
    port: parseInt(DB_PORT) || 5432,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    entities: [User, Post],
    synchronize: false,
    migrationsRun: false,
    migrations: [`${migrationsDir}/*.ts`],
    cli: {
      migrationsDir: migrationsDir
    },
    database: DB_NAME
  };
};

export default DBConfig;
