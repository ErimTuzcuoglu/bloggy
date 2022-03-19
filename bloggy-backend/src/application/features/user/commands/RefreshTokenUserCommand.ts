import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSchema } from '@domain/schemas';
import { AuthService } from '@application/services';
import { EnvironmentVariables, ErrorMessages } from '@domain/enum';
import { RefreshTokenUserResponseViewModel } from '@presentation/view-models';

export class RefreshTokenUserCommand {
  constructor(public readonly accessToken: string, public readonly refreshToken: string) {}
}

@CommandHandler(RefreshTokenUserCommand)
export class RefreshTokenUserHandler implements ICommandHandler<RefreshTokenUserCommand> {
  constructor(
    @InjectRepository(UserSchema)
    private usersRepository: Repository<UserSchema>,
    private authService: AuthService
  ) {}

  async execute({
    accessToken,
    refreshToken
  }: RefreshTokenUserCommand): Promise<RefreshTokenUserResponseViewModel> {
    const accessTokenVerify = this.authService.verifyToken(accessToken, { ignoreExpiration: true });
    const refreshTokenVerify = this.authService.verifyToken(refreshToken, {
      ignoreExpiration: true,
      secret: process.env[EnvironmentVariables.JWT_REFRESH_TOKEN_SECRET]
    });

    const { id: userId, email: userEmail } = accessTokenVerify;
    if (accessTokenVerify.id !== refreshTokenVerify.id)
      throw new Error(ErrorMessages.TokensAreNotValid);

    const newAccessToken = await this.authService.generateToken({ id: userId, email: userEmail });
    const newRefreshToken = await this.authService.generateToken(
      { id: userId, email: userEmail },
      { secret: process.env[EnvironmentVariables.JWT_REFRESH_TOKEN_SECRET] }
    );

    return new RefreshTokenUserResponseViewModel({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    });
  }
}
