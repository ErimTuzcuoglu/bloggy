import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { createConnection, getManager } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Seeder } from '@persistence/database/Seeder';
import { ErrorMessages } from '@domain/enum';

const DatabaseSetupForStartup = async (configService: ConfigService): Promise<void> => {
  if (!!!configService) throw new Error(ErrorMessages.ConfigServiceNotFound);

  const options: TypeOrmModuleOptions = configService.get('database');
  let connection = await createConnection({
    ...options,
    database: undefined
  } as PostgresConnectionOptions);

  const checkDBScript = `SELECT 1 FROM pg_database WHERE datname = '${options.database}'`;
  const createDb = `CREATE DATABASE ${options.database}`;

  const manager = getManager();
  const result = await manager.query(checkDBScript);

  if (result.length === 0) await manager.query(createDb);

  if (connection.options.database === undefined) {
    await connection.close();
    connection = await createConnection({ ...options } as PostgresConnectionOptions);
  }

  if (result.length === 0) await connection.runMigrations();

  await connection.close();

  const seeder = new Seeder(configService);
  seeder.seedAll();
};

export default DatabaseSetupForStartup;
