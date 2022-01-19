import { PostService } from '@application/services';
import { Module } from '@nestjs/common';
import { PostController } from '@presentation/controllers/post.controller';

@Module({
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
