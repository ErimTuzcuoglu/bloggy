import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetUsersQuery } from '@application/features/user/queries/GetUsersQuery';
import {
  AddUserRequestViewModel,
  GetUserResponseViewModel,
  LoginUserRequestViewModel,
  LoginUserResponseViewModel,
  RefreshTokenUserResponseViewModel,
  RefreshTokenUserRequestViewModel,
  UpdateUserRequestViewModel,
  UpdateUserResponseViewModel,
  DeleteUserResponseViewModel
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
import { Request } from 'express';
import { BaseController } from '@presentation/common';
import { AllowUnauthorizedRequest } from '@presentation/decorator';
import { AuthService } from '@application/services';

@ApiTags('User')
@Controller('User')
export class UserController extends BaseController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private authService: AuthService
  ) {
    super(authService);
  }

  @ApiBearerAuth('jwt')
  @Get()
  async getUsers(): Promise<Array<GetUserResponseViewModel>> {
    const responseData: GetUserResponseViewModel[] = await this.queryBus.execute(
      new GetUsersQuery()
    );
    return responseData;
  }

  @ApiBearerAuth('jwt')
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<GetUserResponseViewModel> {
    const responseData: GetUserResponseViewModel = await this.queryBus.execute(
      new GetUserQuery(id)
    );
    return responseData;
  }

  @Post('login')
  @AllowUnauthorizedRequest()
  async login(
    @Body() loginRequestViewModel: LoginUserRequestViewModel
  ): Promise<LoginUserResponseViewModel> {
    const responseData: LoginUserResponseViewModel = await this.commandBus.execute(
      new LoginUserCommand(loginRequestViewModel.email, loginRequestViewModel.password)
    );
    return responseData;
  }

  @ApiBearerAuth('jwt')
  @Post('logout')
  async logout(@Req() request: Request): Promise<unknown> {
    const responseData: unknown = await this.commandBus.execute(
      new LogoutUserCommand(this.getUserId(request))
    );
    return responseData;
  }

  @ApiBearerAuth('jwt')
  @Post('refreshToken')
  async refreshToken(
    @Body() refreshTokenRequestModel: RefreshTokenUserRequestViewModel
  ): Promise<RefreshTokenUserResponseViewModel> {
    const responseData: RefreshTokenUserResponseViewModel = await this.commandBus.execute(
      new RefreshTokenUserCommand(
        refreshTokenRequestModel.accessToken,
        refreshTokenRequestModel.refreshToken
      )
    );
    return responseData;
  }

  @ApiBearerAuth('jwt')
  @Put()
  async updateUser(
    @Req() request: Request,
    @Body() userRequestViewModel: UpdateUserRequestViewModel
  ): Promise<UpdateUserResponseViewModel> {
    const { email, id, password, name } = userRequestViewModel;
    const responseData: UpdateUserResponseViewModel = await this.commandBus.execute(
      new UpdateUserCommand({ name, email, password, id: id ? id : this.getUserId(request) })
    );
    return responseData;
  }

  @ApiBearerAuth('jwt')
  @Post()
  async addUser(
    @Body() userRequestViewModel: AddUserRequestViewModel
  ): Promise<LoginUserResponseViewModel> {
    const responseData: LoginUserResponseViewModel = await this.commandBus.execute(
      new AddUserCommand(
        userRequestViewModel.name,
        userRequestViewModel.email,
        userRequestViewModel.password
      )
    );
    return responseData;
  }

  @ApiBearerAuth('jwt')
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<DeleteUserResponseViewModel> {
    const responseData: DeleteUserResponseViewModel = await this.commandBus.execute(
      new DeleteUserCommand(id)
    );
    return responseData;
  }
}
