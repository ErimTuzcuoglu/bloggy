import { ConfigModule } from '@nestjs/config';
import { DynamicModule } from '@nestjs/common';
import { Environments } from '@domain/enum';
import dbConfig from '@persistence/database/db.config';

export default class EnvironmentConfig {
  private static setEnvironment(): Array<string> | string {
    switch (process.env.NODE_ENV) {
      case Environments.development:
        return ['.env.development', '.env'];
      case Environments.production:
      default:
        return '.env';
    }
  }

  static Configure(): DynamicModule {
    return ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: this.setEnvironment(),
      load: [dbConfig]
    });
  }
}
