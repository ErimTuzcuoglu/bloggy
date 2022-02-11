import { ClassTransformOptions, plainToInstance } from 'class-transformer';
import { IMapper } from '@infrastructure/helper/IMapper';

export default class Mapper implements IMapper {
  toViewModel<S, T>(
    source: S,
    target: any,
    options: ClassTransformOptions = { excludeExtraneousValues: true }
  ): T | T[] {
    return plainToInstance<T, S>(target, source, options);
  }
}
