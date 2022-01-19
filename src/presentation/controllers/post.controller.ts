import { Controller, Get } from '@nestjs/common';
import { PostService } from '@application/services';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Post')
@Controller('Post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getHello(): string {
    return this.postService.getHello();
  }
}
