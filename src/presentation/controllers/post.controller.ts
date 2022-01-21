import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';
import { GetUsersQuery } from '@application/features/user/queries/GetUsersQuery';

@ApiTags('Post')
@Controller('Post')
export class PostController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async getPosts(): Promise<string> {
    return await this.queryBus.execute(new GetUsersQuery());
  }

  @Get(':id')
  async getPost(@Param('id') id: Promise<string>) {
    return await this.queryBus.execute(new GetUsersQuery());
  }

  @Post()
  async addPost(@Param('id') id: Promise<string>) {
    return await this.queryBus.execute(new GetUsersQuery());
  }

  @Put()
  async updatePost(@Param('id') id: Promise<string>) {
    return await this.queryBus.execute(new GetUsersQuery());
  }

  @Delete()
  async deletePost(@Param('id') id: Promise<string>) {
    return await this.queryBus.execute(new GetUsersQuery());
  }
}
