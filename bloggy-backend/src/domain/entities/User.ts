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
    },
    hashedPassword: {
      type: String
    },
    salt: {
      type: String
    },
    refreshToken: {
      type: String
    },
    lastLoginDate: {
      type: Date,
      nullable: true
    },
    isFreezed: {
      type: Boolean,
      default: false
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
