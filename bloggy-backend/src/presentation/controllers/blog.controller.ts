import { Controller, Get, Req, Res } from '@nestjs/common';
import { AllowUnauthorizedRequest } from '@presentation/common';
import { ViewService } from '@application/services';
import { Request, Response } from 'express';

// @ApiTags('Blog')
@Controller('Blog')
export class BlogController {
  constructor(private viewService: ViewService) {}

  @AllowUnauthorizedRequest()
  @Get('*')
  async static(@Req() req: Request, @Res() res: Response) {
    await this.viewService.handler(req, res);
  }
}
