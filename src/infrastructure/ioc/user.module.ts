/* #region  Global Imports */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
/* #endregion */
import { GetUsersHandler } from '@application/features/user/queries/GetUsersQuery';
import { UserController } from '@presentation/controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from '@domain/schemas';

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([UserSchema]), CqrsModule],
  providers: [GetUsersHandler]
})
export class UserModule {}
