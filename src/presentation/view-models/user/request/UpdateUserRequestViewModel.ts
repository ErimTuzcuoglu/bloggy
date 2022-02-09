import { ApiProperty } from '@nestjs/swagger';
import { plainToClass, Expose } from 'class-transformer';
import { UserSchema } from '@domain/schemas/UserSchema';

export class UpdateUserRequestViewModel {
  @ApiProperty()
  @Expose()
  password?: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  email: string;

  static fromViewModel(user: UpdateUserRequestViewModel): UserSchema {
    return plainToClass(UserSchema, user, { excludeExtraneousValues: true });
  }
}
