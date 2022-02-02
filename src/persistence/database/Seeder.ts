import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Connection, createConnection } from 'typeorm';
import crypto from 'crypto';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { UserSchema } from '@domain/schemas';
import { EnvironmentVariables } from '@domain/enum';

export class Seeder {
  constructor(private readonly configService: ConfigService) {}
  connection: Connection | undefined;

  async seedAll() {
    await this.users()
      .then((completed) => {
        Logger.debug('Successfuly completed seeding users...');
        Promise.resolve(completed);
      })
      .catch((error) => {
        Logger.error('Failed seeding users...');
        Promise.reject(error);
      });

    await this.connection.close();
  }

  async createConnection() {
    const options: TypeOrmModuleOptions = this.configService.get('database');
    this.connection = await createConnection({
      ...options
    } as PostgresConnectionOptions);
  }

  async users() {
    if (!!!this.connection) await this.createConnection();

    const userRepository = this.connection.getRepository(UserSchema);

    const users = await userRepository.find();
    if (users !== undefined && users.length > 0) return;

    const salt = crypto.randomBytes(16).toString('hex');
    const hashedPassword = crypto
      .pbkdf2Sync(
        this.configService.get(EnvironmentVariables.SEED_USER_PASSWORD),
        salt,
        1000,
        64,
        `sha512`
      )
      .toString(`hex`);

    const user = userRepository.save({
      email: this.configService.get(EnvironmentVariables.SEED_USER_MAIL),
      name: this.configService.get(EnvironmentVariables.SEED_USER_NAME),
      salt,
      hashedPassword,
      refreshToken: ''
    });

    return await Promise.all([user])
      .then((createdUser) => {
        // Can also use logger.verbose('...');
        Logger.debug('Master User Created');
        return Promise.resolve(true);
      })
      .catch((error) => Promise.reject(error));
  }
}
