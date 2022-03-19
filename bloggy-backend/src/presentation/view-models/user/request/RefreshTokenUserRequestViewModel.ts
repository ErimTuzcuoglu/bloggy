import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenUserRequestViewModel {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}
