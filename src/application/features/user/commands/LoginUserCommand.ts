import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import crypto from 'crypto';
import { UserSchema } from '@domain/schemas';
import JWTHandler from '@infrastructure/handler/JWTHandler';
import { LoginUserResponseViewModel } from '@presentation/view-models';

export class LoginUserCommand {
  constructor(public readonly email: string, public readonly password: string) {}
}

@QueryHandler(LoginUserCommand)
export class LoginUserHandler implements IQueryHandler<LoginUserCommand> {
  constructor(
    @InjectRepository(UserSchema)
    private usersRepository: Repository<UserSchema>
  ) {}

  async execute(command: LoginUserCommand): Promise<LoginUserResponseViewModel> {
    const user = await this.usersRepository.findOne({ where: { email: command.email } });
    if (user === undefined) throw new Error('User could not found');

    const hashedPassword = crypto
      .pbkdf2Sync(command.password, user.salt, 1000, 64, `sha512`)
      .toString(`hex`);
    if (hashedPassword !== user.hashedPassword) throw new Error('Your password is wrong');

    const accessToken = JWTHandler.generateToken(
      { id: user.id, email: user.email },
      process.env.JWT_ACCESS_TOKEN_SECRET
    );

    const refreshToken = JWTHandler.generateToken(
      { id: user.id, email: user.email },
      process.env.JWT_REFRESH_TOKEN_SECRET
    );

    this.usersRepository.save({
      id: user.id,
      refreshToken
    });

    const body = new LoginUserResponseViewModel();
    body.email = user.email;
    body.id = user.id;
    body.name = user.name;
    body.refreshToken = refreshToken;
    body.accessToken = accessToken;

    return body;
  }
}
