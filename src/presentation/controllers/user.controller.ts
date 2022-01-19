import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';
import { GetUsersQuery } from '@application/features/user/queries/GetUsersQuery';

@ApiTags('User')
@Controller('User')
export class UserController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async getHello(): Promise<string> {
    return await this.queryBus.execute(new GetUsersQuery());
  }
}
