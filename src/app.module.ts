/* #region  Global Imports */
import { Module } from '@nestjs/common';
/* #endregion */
import EnvironmentConfig from '@infrastructure/environments/EnvironmentConfig';
import { PostModule, UserModule } from '@infrastructure/ioc';
import NestDBConfig from '@persistence/database/NestDBConfig';
import { AuthModule } from '@infrastructure/ioc/auth.module';

@Module({
  imports: [
    EnvironmentConfig.Configure(),
    NestDBConfig.Configure(),
    PostModule,
    UserModule,
    AuthModule
  ]
})
export class AppModule {}
