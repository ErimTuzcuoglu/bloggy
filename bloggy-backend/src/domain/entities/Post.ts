import { BaseAuditableEntity } from '@domain/common/BaseAuditableEntity';
import { PostSchema, TagSchema, UserSchema } from '@domain/schemas';
import { EntitySchema } from 'typeorm';

export const Post = new EntitySchema<PostSchema>({
  name: 'Post',
  tableName: 'post',
  target: PostSchema,
  columns: {
    ...BaseAuditableEntity,
    title: {
      type: String
    },
    post: {
      type: String
    },
    coverPhoto: {
      type: String,
      nullable: true
    }
  },
  relations: {
    tags: {
      cascade: true,
      lazy: true,
      type: 'many-to-many',
      target: () => TagSchema,
      joinTable: {
        name: 'postTag', // table name for the junction table of this relation
        joinColumn: {
          name: 'postId',
          referencedColumnName: 'id'
        },
        inverseJoinColumn: {
          name: 'tagId',
          referencedColumnName: 'id'
        }
      }
    },
    user: {
      lazy: true,
      type: 'many-to-one',
      target: () => UserSchema,
      joinColumn: true
    }
  }
});
