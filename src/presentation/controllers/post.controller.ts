import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Request } from 'express';
import { BaseController } from '@presentation/common';
import { AllowUnauthorizedRequest } from '@presentation/decorator';
import { AuthService } from '@application/services';
import {
  AddPostCommand,
  DeletePostCommand,
  GetPostQuery,
  GetPostsQuery,
  UpdatePostCommand
} from '@application/features';
import {
  AddPostRequestViewModel,
  AddPostResponseViewModel,
  UpdatePostRequestViewModel
} from '@presentation/view-models';

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
  async addPost(
    @Req() request: Request,
    @Body() addPostRequestViewModel: AddPostRequestViewModel
  ): Promise<AddPostResponseViewModel> {
    const { coverPhoto, post, tags, title } = addPostRequestViewModel;
    const response = await this.commandBus.execute(
      new AddPostCommand({
        coverPhoto,
        post,
        title,
        userId: this.getUserId(request),
        tags
      })
    );
    return response;
  }

  @ApiBearerAuth('jwt')
  @Put()
  async updatePost(
    @Req() request: Request,
    @Body() updatePostRequestViewModel: UpdatePostRequestViewModel
  ) {
    const { coverPhoto, post, postId, tags, title } = updatePostRequestViewModel;
    return await this.commandBus.execute(
      new UpdatePostCommand({
        coverPhoto,
        post,
        postId,
        tags,
        title,
        userId: this.getUserId(request)
      })
    );
  }

  @ApiBearerAuth('jwt')
  @Delete()
  async deletePost(@Req() request: Request, @Param('id') id: string) {
    return await this.commandBus.execute(new DeletePostCommand(this.getUserId(request), id));
  }
}
