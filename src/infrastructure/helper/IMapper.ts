import { ClassTransformOptions } from 'class-transformer';

export interface IMapper {
  toViewModel<S, T>(source: S, target: any, options: ClassTransformOptions): T | T[];
}
