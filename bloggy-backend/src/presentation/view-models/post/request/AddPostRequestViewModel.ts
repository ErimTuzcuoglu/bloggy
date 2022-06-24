import { ApiProperty } from '@nestjs/swagger';

export class AddPostRequestViewModel {
  @ApiProperty()
  coverPhoto: string;
  @ApiProperty()
  post: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  userId: string;
  @ApiProperty()
  postTags: string[];
  @ApiProperty()
  addedTags: string[];
}
