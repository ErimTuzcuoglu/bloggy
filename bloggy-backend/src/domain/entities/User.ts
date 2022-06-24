import { BaseAuditableEntity } from '@domain/common/BaseAuditableEntity';
import { UserSchema, PostSchema } from '@domain/schemas';
import { EntitySchema } from 'typeorm';

export const User = new EntitySchema<UserSchema>({
  name: 'User',
  tableName: 'user',
  target: UserSchema,
  columns: {
    ...BaseAuditableEntity,
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
      cascade: true,
      lazy: true,
      type: 'one-to-many',
      target: () => PostSchema
    }
  }
});
