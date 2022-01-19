/* #region  Global Imports */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
/* #endregion */
import { PostService } from '@application/services';
import { PostController } from '@presentation/controllers/post.controller';

@Module({
  controllers: [PostController],
  imports: [CqrsModule],
  providers: [PostService]
})
export class PostModule {}
