import { Decorator } from '@domain/enum';

export const DisableResponseWrapper =
  () => (target, propertyKey: string, descriptor: PropertyDescriptor) => {
    descriptor.value[Decorator.disableResponseWrapper] = true;
  };
