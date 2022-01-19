/* #region  Global Imports */
import { Module } from '@nestjs/common';
/* #endregion */
import EnvironmentConfig from '@infrastructure/environments/EnvironmentConfig';
import { PostModule, UserModule } from '@infrastructure/ioc';
import NestDBConfig from '@persistence/database/NestDBConfig';

@Module({
  imports: [EnvironmentConfig.Configure(), NestDBConfig.Configure(), PostModule, UserModule]
})
export class AppModule {}
