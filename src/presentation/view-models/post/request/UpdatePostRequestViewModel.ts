import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostRequestViewModel {
  @ApiProperty()
  coverPhoto: string;
  @ApiProperty()
  post: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  postId: string;
  @ApiProperty()
  tags: Array<{ name?: string; id?: string }>;
}
