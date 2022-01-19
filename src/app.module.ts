/* #region  Global Imports */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
/* #endregion */
import { setEnvironment } from '@infrastructure/environments/helper';
import { PostModule, UserModule } from '@infrastructure/ioc';
import NestDBConfig from '@persistence/database/nest.db.config';
import dbConfig from '@persistence/database/db.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: setEnvironment(),
      load: [dbConfig]
    }),
    NestDBConfig(),
    PostModule,
    UserModule
  ]
})
export class AppModule {}
