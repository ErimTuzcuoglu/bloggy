import { ApiProperty } from '@nestjs/swagger';

export class AddPostRequestViewModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;
}
