import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetUsersQuery } from '@application/features/user/queries/GetUsersQuery';
import { BaseController } from '@presentation/common';
import { AllowUnauthorizedRequest } from '@presentation/decorator';
import { AuthService } from '@application/services';
import { AddPostCommand, GetPostQuery, GetPostsQuery } from '@application/features';
import { AddPostRequestViewModel, AddPostResponseViewModel } from '@presentation/view-models';

@ApiTags('Post')
@Controller('Post')
export class PostController extends BaseController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private authService: AuthService
  ) {
    super(authService);
  }

  @Get()
  @AllowUnauthorizedRequest()
  async getPosts(): Promise<string> {
    return await this.queryBus.execute(new GetPostsQuery());
  }

  @Get(':id')
  @AllowUnauthorizedRequest()
  async getPost(@Param('id') id: string): Promise<string> {
    return await this.queryBus.execute(new GetPostQuery(id));
  }

  @Post()
  @AllowUnauthorizedRequest()
  async addPost(
    @Body() addPostRequestViewModel: AddPostRequestViewModel
  ): Promise<AddPostResponseViewModel> {
    const { addedTags, coverPhoto, post, postTags, title, userId } = addPostRequestViewModel;
    const response = await this.commandBus.execute(
      new AddPostCommand({ coverPhoto, post, title, userId, postTags, addedTags })
    );
    return response;
  }

  @ApiBearerAuth('jwt')
  @Put()
  async updatePost(@Param('id') id: Promise<string>) {
    return await this.queryBus.execute(new GetUsersQuery());
  }

  @ApiBearerAuth('jwt')
  @Delete()
  async deletePost(@Param('id') id: Promise<string>) {
    return await this.queryBus.execute(new GetUsersQuery());
  }
}
