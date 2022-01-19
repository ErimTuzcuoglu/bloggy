import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { createConnection, getManager } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { ConfigService } from '@nestjs/config';

export default class NestDBConfig {
  private static CreateDBIfNotExists = async (options: TypeOrmModuleOptions): Promise<void> => {
    const connection = await createConnection(options as PostgresConnectionOptions);

    const checkDBScript = `SELECT 1 FROM pg_database WHERE datname = '${process.env.DB_NAME}'`;
    const createDb = `CREATE DATABASE ${process.env.DB_NAME}`;

    const manager = getManager();
    const result = await manager.query(checkDBScript);

    if (result.length === 0) await manager.query(createDb);

    connection.close();
  };

  static Configure = async (): Promise<DynamicModule> => {
    return TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const options = configService.get('database');

        await NestDBConfig.CreateDBIfNotExists({ ...options, database: undefined });
        return { ...options };
      }
    });
  };
}
