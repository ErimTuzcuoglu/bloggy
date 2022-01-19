import { registerAs } from '@nestjs/config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

export default registerAs('database', () => {
  const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;
  const migrationsDir = path.join(__dirname, '../migrations');

  return {
    type: 'postgres',
    host: DB_HOST,
    port: parseInt(DB_PORT) || 5432,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    entities: [path.join(`${__dirname}../../domain/entities/*.{ts,js}`)],
    synchronize: false,
    migrationsRun: false,
    migrations: [`${migrationsDir}/*.{ts,js}`],
    cli: {
      migrationsDir: migrationsDir
    },
    database: DB_NAME
  };
});
