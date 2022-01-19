import { BaseEntity } from '@domain/common/BaseEntity';
import { UserSchema, PostSchema } from '@domain/schemas';
import { EntitySchema } from 'typeorm';

export const User = new EntitySchema<UserSchema>({
  name: 'User',
  tableName: 'user',
  target: UserSchema,
  columns: {
    ...BaseEntity,
    email: {
      type: String
    },
    name: {
      type: String
    }
  },
  relations: {
    posts: {
      lazy: true,
      type: 'one-to-many',
      target: () => PostSchema,
      joinColumn: true
    }
  }
});
