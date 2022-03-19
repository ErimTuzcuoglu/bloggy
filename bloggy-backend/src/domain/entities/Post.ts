import { BaseEntity } from '@domain/common/BaseEntity';
import { PostSchema, UserSchema } from '@domain/schemas';
import { EntitySchema } from 'typeorm';

export const Post = new EntitySchema<PostSchema>({
  name: 'Post',
  tableName: 'post',
  target: PostSchema,
  columns: {
    ...BaseEntity,
    title: {
      type: String
    },
    text: {
      type: String
    }
  },
  relations: {
    user: {
      lazy: true,
      type: 'one-to-one',
      target: () => UserSchema,
      joinColumn: true
    }
  }
});
