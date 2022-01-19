import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { createConnection, getManager } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import DBConfig from '@persistence/database/config';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
const checkDBScript: string = fs
  .readFileSync(path.join(__dirname, '../script/checkDBIfExists.sql'))
  .toString();
const createDb: string = fs.readFileSync(path.join(__dirname, '../script/createDB.sql')).toString();

const CreateDBIfNotExists = async (options: TypeOrmModuleOptions): Promise<void> => {
  const connection = await createConnection(options as PostgresConnectionOptions);

  const manager = getManager();
  const result = await manager.query(checkDBScript);

  if (result.length === 0) await manager.query(createDb);

  connection.close();
};

const NestDBConfig = async (): Promise<DynamicModule> => {
  return TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const options = configService.get('database');

      await CreateDBIfNotExists({ ...options, database: undefined });
      return { ...options };
    }
  });
};

export default NestDBConfig;
