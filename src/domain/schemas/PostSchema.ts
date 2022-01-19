import { BaseSchema } from '@domain/common/BaseSchema';
import { IEntity } from '@domain/contract/IEntity';
import { UserSchema } from '@domain/schemas/UserSchema';

export class PostSchema extends BaseSchema implements IEntity {
  title: string;
  text: string;
  user: UserSchema;

  constructor(id: string, title: string, text: string, user: UserSchema) {
    super();
    this.id = id;
    this.title = title;
    this.text = text;
    this.user = user;
  }

  equals(entity: IEntity): boolean {
    if (!(entity instanceof PostSchema)) return false;

    return this.id === entity.id;
  }
}
