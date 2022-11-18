/* #region  Global Imports */
import { PostSchema, TagSchema, UserSchema } from '@domain/schemas';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
/* #endregion */
import { PostController } from '@presentation/controllers/post.controller';
import { AuthModule } from './application/auth.module';
import Mapper from '@infrastructure/helper/Mapper';
import {
  AddPostHandler,
  DeletePostHandler,
  GetPostHandler,
  GetPostsHandler
} from '@application/features';
import { UpdatePostHandler } from '@application/features/post/commands/UpdatePostCommand';

@Module({
  controllers: [PostController],
  imports: [TypeOrmModule.forFeature([TagSchema, UserSchema, PostSchema]), CqrsModule, AuthModule],
  providers: [
    Mapper,
    AddPostHandler,
    GetPostHandler,
    GetPostsHandler,
    UpdatePostHandler,
    DeletePostHandler
  ]
})
export class PostModule {}
