/* #region  Global Imports */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
/* #endregion */
import { GetUsersHandler } from '@application/features/user/queries/GetUsersQuery';
import { UserController } from '@presentation/controllers/user.controller';

@Module({
  controllers: [UserController],
  imports: [CqrsModule],
  providers: [GetUsersHandler]
})
export class UserModule {}
