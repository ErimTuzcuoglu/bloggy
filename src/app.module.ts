/* #region  Global Imports */
import { Module } from '@nestjs/common';
/* #endregion */
import {
  AuthModule,
  DatabaseModule,
  EnvironmentModule,
  PostModule,
  UserModule
} from '@infrastructure/ioc';

@Module({
  imports: [EnvironmentModule, DatabaseModule, PostModule, UserModule, AuthModule]
})
export class AppModule {}
