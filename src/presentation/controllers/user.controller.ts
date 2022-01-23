import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
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

@ApiTags('User')
@Controller('User')
export class UserController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async getUsers(): Promise<string> {
    const data = await this.queryBus.execute(new GetUsersQuery());
    //TODO: Mapping will add
    return data;
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<ApiResponse<GetUserResponseViewModel>> {
    const data = await this.queryBus.execute(new GetUserQuery(id));
    //TODO: Mapping will add
    return new ApiResponse(data);
  }

  @Post('login')
  async login(
    @Body() loginRequestViewModel: LoginUserRequestViewModel
  ): Promise<ApiResponse<LoginUserResponseViewModel>> {
    const data = await this.queryBus.execute(
      new LoginUserCommand(loginRequestViewModel.email, loginRequestViewModel.password)
    );
    //TODO: Mapping will add
    return new ApiResponse(data);
  }

  @Post('logout/:id')
  async logout(@Param('id') id: string): Promise<string> {
    return await this.queryBus.execute(new LogoutUserCommand());
  }

  @Post('refreshToken')
  async refreshToken(
    @Body() refreshTokenRequestModel: RefreshTokenUserRequestViewModel
  ): Promise<string> {
    return await this.queryBus.execute(new RefreshTokenUserCommand());
  }

  @Put()
  async updateUser(@Body() userRequestViewModel: UpdateUserRequestViewModel): Promise<string> {
    return await this.queryBus.execute(new UpdateUserCommand());
  }

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

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<string> {
    return await this.queryBus.execute(new DeleteUserCommand());
  }
}
