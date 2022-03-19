import { ApiProperty } from '@nestjs/swagger';

export class LoginUserRequestViewModel {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
