import { plainToClass, Expose } from 'class-transformer';
import { UserSchema } from '@domain/schemas/UserSchema';
import { ApiProperty } from '@nestjs/swagger';

export class AddPostRequestViewModel {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  email: string;

  static fromViewModel(user: AddPostRequestViewModel): UserSchema {
    return plainToClass(UserSchema, user, { excludeExtraneousValues: true });
  }
}
