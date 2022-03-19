import { registerAs } from '@nestjs/config';
import { EnvironmentVariables } from '@domain/enum';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

export default registerAs('database', () => {
  const {
    [EnvironmentVariables.DB_HOST]: DB_HOST,
    [EnvironmentVariables.DB_PORT]: DB_PORT,
    [EnvironmentVariables.DB_USERNAME]: DB_USERNAME,
    [EnvironmentVariables.DB_PASSWORD]: DB_PASSWORD,
    [EnvironmentVariables.DB_NAME]: DB_NAME
  } = process.env;
  const migrationsDir = path.join(__dirname, '../migrations');
  const entitiesDir = path.join(`${__dirname}/../../domain/entities/*{.ts,.js}`);

  return {
    type: 'postgres',
    host: DB_HOST,
    port: parseInt(DB_PORT) || 5432,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    entities: [entitiesDir],
    synchronize: false,
    migrationsRun: false,
    migrations: [`${migrationsDir}/*{.ts,.js}`],
    cli: {
      migrationsDir: migrationsDir
    },
    database: DB_NAME
  };
});
