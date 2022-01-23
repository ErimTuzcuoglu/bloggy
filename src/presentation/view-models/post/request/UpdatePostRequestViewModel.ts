import { plainToClass, Expose } from 'class-transformer';
import { UserSchema } from '@domain/schemas/UserSchema';

export class UpdatePostRequestViewModel {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  static fromViewModel(user: UpdatePostRequestViewModel): UserSchema {
    return plainToClass(UserSchema, user, { excludeExtraneousValues: true });
  }
}
