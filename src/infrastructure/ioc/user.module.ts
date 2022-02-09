/* #region  Global Imports */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
/* #endregion */
import { UserController } from '@presentation/controllers/user.controller';
import { UserSchema } from '@domain/schemas';
import {
  AddUserHandler,
  DeleteUserHandler,
  GetUserHandler,
  GetUsersHandler,
  LoginUserHandler,
  LogoutUserHandler,
  RefreshTokenUserHandler,
  UpdateUserHandler
} from '@application/features';
import { AuthModule } from './application/auth.module';

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([UserSchema]), CqrsModule, AuthModule],
  providers: [
    GetUserHandler,
    GetUsersHandler,
    AddUserHandler,
    LoginUserHandler,
    LogoutUserHandler,
    RefreshTokenUserHandler,
    UpdateUserHandler,
    DeleteUserHandler
  ]
})
export class UserModule {}
