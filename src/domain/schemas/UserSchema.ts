import { BaseSchema } from '@domain/common/BaseSchema';
import { IEntity } from '@domain/contract/IEntity';
import { PostSchema } from '@domain/schemas';

export class UserSchema extends BaseSchema implements IEntity {
  name: string;
  email: string;
  posts?: Array<PostSchema>;

  constructor(id: string, name: string, email: string, posts?: Array<PostSchema>) {
    super();
    this.id = id;
    this.name = name;
    this.email = email;
    this.posts = posts;
  }

  equals(entity: IEntity): boolean {
    if (!(entity instanceof UserSchema)) return false;

    return this.id === entity.id;
  }
}
