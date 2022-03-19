/* #region  Global Imports */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
/* #endregion */
import { PostController } from '@presentation/controllers/post.controller';

@Module({
  controllers: [PostController],
  imports: [CqrsModule],
  providers: []
})
export class PostModule {}
