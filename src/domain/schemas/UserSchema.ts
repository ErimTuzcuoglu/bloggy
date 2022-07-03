import { BaseAuditableSchema } from '@domain/common/BaseAuditableSchema';
import { IEntity } from '@domain/contract/IEntity';
import { PostSchema } from '@domain/schemas';

export class UserSchema extends BaseAuditableSchema implements IEntity {
  name: string;
  email: string;
  hashedPassword: string;
  salt: string;
  refreshToken: string;
  lastLoginDate?: Date;
  isFreezed: boolean;
  posts?: PostSchema[];

  constructor(
    id: string,
    name: string,
    email: string,
    hashedPassword: string,
    salt: string,
    refreshToken: string,
    isFreezed: boolean,
    isDeleted: boolean,
    updatedAt: Date,
    createdAt: Date,
    lastLoginDate?: Date,
    posts?: PostSchema[]
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
    this.updatedAt = updatedAt;
    this.createdAt = createdAt;
  }

  equals(entity: IEntity): boolean {
    if (!(entity instanceof UserSchema)) return false;

    return this.id === entity.id;
  }
}
