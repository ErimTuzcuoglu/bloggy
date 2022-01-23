import { ApiProperty } from '@nestjs/swagger';

export class AddUserRequestViewModel {
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
