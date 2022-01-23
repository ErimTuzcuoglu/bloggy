import { plainToClass, Expose } from 'class-transformer';
import { UserSchema } from '@domain/schemas/UserSchema';

export class GetUserResponseViewModel {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  static toViewModel(user: UserSchema): GetUserResponseViewModel {
    return plainToClass(GetUserResponseViewModel, user, { excludeExtraneousValues: true });
  }
}
