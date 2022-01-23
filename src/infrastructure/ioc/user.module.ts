/* #region  Global Imports */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
/* #endregion */
import { UserController } from '@presentation/controllers/user.controller';
import { UserSchema } from '@domain/schemas';
import {
  AddUserHandler,
  GetUserHandler,
  GetUsersHandler,
  LoginUserHandler
} from '@application/features';

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([UserSchema]), CqrsModule],
  providers: [GetUserHandler, GetUsersHandler, AddUserHandler, LoginUserHandler]
})
export class UserModule {}
