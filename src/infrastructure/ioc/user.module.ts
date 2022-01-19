import { Module } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { UserController } from '@presentation/controllers/user.controller';

@Module({
  controllers: [UserController],
  providers: [QueryBus]
})
export class UserModule {}
