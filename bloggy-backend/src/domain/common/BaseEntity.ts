import { EntitySchemaColumnOptions } from 'typeorm';

export const BaseEntity = {
  id: {
    generated: 'uuid',
    type: 'uuid',
    primary: true
  } as EntitySchemaColumnOptions,
  createdAt: {
    name: 'createdAt',
    type: 'timestamp with time zone',
    createDate: true
  } as EntitySchemaColumnOptions,
  updatedAt: {
    name: 'updatedAt',
    type: 'timestamp with time zone',
    updateDate: true
  } as EntitySchemaColumnOptions,
  isDeleted: {
    name: 'isDeleted',
    type: 'boolean',
    default: false
  } as EntitySchemaColumnOptions
};
