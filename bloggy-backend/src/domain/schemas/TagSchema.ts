import { BaseSchema } from '@domain/common/BaseSchema';
import { IEntity } from '@domain/contract/IEntity';
import { PostSchema } from '@domain/schemas';

export class TagSchema extends BaseSchema implements IEntity {
  tag: string;
  posts: PostSchema[];

  constructor(id: string, tag: string, createdAt: Date, posts: PostSchema[]) {
    super();
    this.id = id;
    this.tag = tag;
    this.createdAt = createdAt;
    this.posts = posts;
  }

  equals(entity: IEntity): boolean {
    if (!(entity instanceof TagSchema)) return false;

    return this.id === entity.id;
  }
}
