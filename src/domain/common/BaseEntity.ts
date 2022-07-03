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
  } as EntitySchemaColumnOptions
};
