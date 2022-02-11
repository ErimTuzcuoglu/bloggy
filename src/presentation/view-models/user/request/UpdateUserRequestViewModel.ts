import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserRequestViewModel {
  @ApiPropertyOptional()
  password?: string;

  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional()
  email?: string;

  @ApiPropertyOptional()
  id?: string;
}
