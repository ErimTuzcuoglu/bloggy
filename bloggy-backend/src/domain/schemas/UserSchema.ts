import { BaseSchema } from '@domain/common/BaseSchema';
import { IEntity } from '@domain/contract/IEntity';
import { PostSchema } from '@domain/schemas';

export class UserSchema extends BaseSchema implements IEntity {
  name: string;
  email: string;
  hashedPassword: string;
  salt: string;
  refreshToken: string;
  lastLoginDate: Date;
  isFreezed: boolean;
  posts?: Array<PostSchema>;

  constructor(
    id: string,
    name: string,
    email: string,
    hashedPassword: string,
    salt: string,
    refreshToken: string,
    lastLoginDate: Date,
    isFreezed: boolean,
    isDeleted: boolean,
    posts?: Array<PostSchema>
  ) {
    super();
    this.id = id;
    this.name = name;
    this.email = email;
    this.hashedPassword = hashedPassword;
    this.salt = salt;
    this.refreshToken = refreshToken;
    this.posts = posts;
    this.lastLoginDate = lastLoginDate;
    this.isFreezed = isFreezed;
    this.isDeleted = isDeleted;
  }

  equals(entity: IEntity): boolean {
    if (!(entity instanceof UserSchema)) return false;

    return this.id === entity.id;
  }
}
