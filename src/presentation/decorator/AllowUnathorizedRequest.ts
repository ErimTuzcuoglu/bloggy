import { SetMetadata } from '@nestjs/common';
import { Decorator } from '@domain/enum';

export const AllowUnauthorizedRequest = () => SetMetadata(Decorator.allowUnauthorizedRequest, true);
