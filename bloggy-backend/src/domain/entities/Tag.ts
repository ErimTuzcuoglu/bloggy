import { BaseAuditableEntity } from '@domain/common/BaseAuditableEntity';
import { PostSchema, TagSchema } from '@domain/schemas';
import { EntitySchema } from 'typeorm';

export const Tag = new EntitySchema<TagSchema>({
  name: 'Tag',
  tableName: 'tag',
  target: TagSchema,
  columns: {
    ...BaseAuditableEntity,
    tag: {
      type: String
    }
  },
  relations: {
    posts: {
      lazy: true,
      type: 'many-to-many',
      target: () => PostSchema
    }
  }
});
