import { EntitySchemaColumnOptions } from 'typeorm';

export const BaseEntity = {
  id: {
    type: String,
    primary: true,
    nullable: false
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
  } as EntitySchemaColumnOptions
};
