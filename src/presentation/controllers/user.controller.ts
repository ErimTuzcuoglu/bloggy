import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';
import { GetUsersQuery } from '@application/features/user/queries/GetUsersQuery';

@ApiTags('User')
@Controller('User')
export class UserController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async getUsers(): Promise<string> {
    return await this.queryBus.execute(new GetUsersQuery());
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<string> {
    return await this.queryBus.execute(new GetUsersQuery());
  }

  @Post('login')
  async login(): Promise<string> {
    return await this.queryBus.execute(new GetUsersQuery());
  }

  @Post('logout')
  async logout(): Promise<string> {
    return await this.queryBus.execute(new GetUsersQuery());
  }

  @Post('refreshToken')
  async refreshToken(): Promise<string> {
    return await this.queryBus.execute(new GetUsersQuery());
  }

  @Put()
  async updateUser(): Promise<string> {
    return await this.queryBus.execute(new GetUsersQuery());
  }

  @Post()
  async addUser(): Promise<string> {
    return await this.queryBus.execute(new GetUsersQuery());
  }

  @Delete()
  async deleteUser(): Promise<string> {
    return await this.queryBus.execute(new GetUsersQuery());
  }
}
