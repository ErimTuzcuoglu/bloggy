import { EntitySchemaColumnOptions } from 'typeorm';
import { BaseEntity } from './BaseEntity';

export const BaseAuditableEntity = {
  ...BaseEntity,
  updatedAt: {
    name: 'updatedAt',
    type: 'timestamp with time zone',
    default: null,
    nullable: true,
    updateDate: true
  } as EntitySchemaColumnOptions,
  isDeleted: {
    name: 'isDeleted',
    type: 'boolean',
    default: false
  } as EntitySchemaColumnOptions
};
