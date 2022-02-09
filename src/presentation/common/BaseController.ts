import { Controller } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '@application/services';
import ApiResponse from '@domain/common/ApiResponse';

@Controller()
export class BaseController {
  constructor(private _authService: AuthService) {}

  private decodeToken(token: string) {
    return this._authService.verifyToken(token?.replace('Bearer ', ''));
  }

  getUserId(request: Request): string {
    return this.decodeToken(request.headers.authorization).id as string;
  }

  getUserEmail(request: Request): string {
    return this.decodeToken(request.headers.authorization).email as string;
  }

  responseView(payload: any): ApiResponse<typeof payload> {
    return new ApiResponse<typeof payload>(payload);
  }
}
