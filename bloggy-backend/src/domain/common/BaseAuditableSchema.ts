import { BaseSchema } from './BaseSchema';

export class BaseAuditableSchema extends BaseSchema {
  updatedAt: Date;
  isDeleted: boolean;
}
