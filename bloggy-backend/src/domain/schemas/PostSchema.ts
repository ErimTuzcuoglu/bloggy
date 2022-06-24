import { BaseAuditableSchema } from '@domain/common/BaseAuditableSchema';
import { IEntity } from '@domain/contract/IEntity';
import { TagSchema, UserSchema } from '@domain/schemas';

export class PostSchema extends BaseAuditableSchema implements IEntity {
  coverPhoto?: string;
  post: string;
  tags?: TagSchema[];
  title: string;
  user: UserSchema;

  constructor(
    id: string,
    title: string,
    post: string,
    createdAt: Date,
    updatedAt: Date,
    isDeleted: boolean,
    user: UserSchema,
    coverPhoto?: string,
    tags?: TagSchema[]
  ) {
    super();
    this.id = id;
    this.coverPhoto = coverPhoto;
    this.tags = tags;
    this.title = title;
    this.post = post;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.isDeleted = isDeleted;
    this.user = user;
  }

  equals(entity: IEntity): boolean {
    if (!(entity instanceof PostSchema)) return false;

    return this.id === entity.id;
  }
}
