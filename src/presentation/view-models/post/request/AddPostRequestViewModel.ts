import { ApiProperty } from '@nestjs/swagger';

export class AddPostRequestViewModel {
  @ApiProperty()
  coverPhoto: string;
  @ApiProperty()
  post: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  tags: Array<{ name?: string; id?: string }>;
}
