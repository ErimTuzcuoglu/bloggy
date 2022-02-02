import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';
import { GetUsersQuery } from '@application/features/user/queries/GetUsersQuery';
import {
  AddUserRequestViewModel,
  GetUserResponseViewModel,
  LoginUserRequestViewModel,
  LoginUserResponseViewModel,
  RefreshTokenUserRequestViewModel,
  UpdateUserRequestViewModel
} from '@presentation/view-models';
import { GetUserQuery } from '@application/features/user/queries/GetUserQuery';
import {
  AddUserCommand,
  DeleteUserCommand,
  LoginUserCommand,
  LogoutUserCommand,
  RefreshTokenUserCommand,
  UpdateUserCommand
} from '@application/features';
import ApiResponse from '@domain/common/ApiResponse';
import { JWTAuthGuard } from '@infrastructure/security/guard/JWTAuthGuard';
import { Request } from 'express';
import { AllowUnauthorizedRequest } from '@presentation/common';

@ApiTags('User')
@Controller('User')
@UseGuards(JWTAuthGuard)
export class UserController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiBearerAuth('jwt')
  @Get()
  async getUsers(): Promise<string> {
    const data = await this.queryBus.execute(new GetUsersQuery());
    //TODO: Mapping will add
    return data;
  }

  @ApiBearerAuth('jwt')
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<ApiResponse<GetUserResponseViewModel>> {
    const data = await this.queryBus.execute(new GetUserQuery(id));
    //TODO: Mapping will add
    return new ApiResponse(data);
  }

  @Post('login')
  @AllowUnauthorizedRequest()
  async login(
    @Body() loginRequestViewModel: LoginUserRequestViewModel
  ): Promise<ApiResponse<LoginUserResponseViewModel>> {
    const data = await this.queryBus.execute(
      new LoginUserCommand(loginRequestViewModel.email, loginRequestViewModel.password)
    );
    //TODO: Mapping will add
    return new ApiResponse(data);
  }

  @ApiBearerAuth('jwt')
  @Post('logout/:id')
  async logout(@Req() request: Request): Promise<string> {
    return await this.queryBus.execute(new LogoutUserCommand());
  }

  @ApiBearerAuth('jwt')
  @Post('refreshToken')
  async refreshToken(
    @Body() refreshTokenRequestModel: RefreshTokenUserRequestViewModel
  ): Promise<string> {
    return await this.queryBus.execute(new RefreshTokenUserCommand());
  }

  @ApiBearerAuth('jwt')
  @Put()
  async updateUser(@Body() userRequestViewModel: UpdateUserRequestViewModel): Promise<string> {
    return await this.queryBus.execute(new UpdateUserCommand());
  }

  @ApiBearerAuth('jwt')
  @Post()
  async addUser(
    @Body() userRequestViewModel: AddUserRequestViewModel
  ): Promise<ApiResponse<LoginUserResponseViewModel>> {
    const data = await this.queryBus.execute(
      new AddUserCommand(
        userRequestViewModel.name,
        userRequestViewModel.email,
        userRequestViewModel.password
      )
    );
    //TODO: Mapping will add
    return new ApiResponse(data);
  }

  @ApiBearerAuth('jwt')
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<string> {
    return await this.queryBus.execute(new DeleteUserCommand());
  }
}
