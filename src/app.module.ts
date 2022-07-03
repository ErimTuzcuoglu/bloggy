/* #region  Global Imports */
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
/* #endregion */
import { JWTAuthGuard } from '@infrastructure/security/guard/JWTAuthGuard';
import {
  AuthModule,
  DatabaseModule,
  EnvironmentModule,
  PostModule,
  UserModule
} from '@infrastructure/ioc';

@Module({
  imports: [EnvironmentModule, DatabaseModule, PostModule, UserModule, AuthModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JWTAuthGuard
    }
  ]
})
export class AppModule {}
