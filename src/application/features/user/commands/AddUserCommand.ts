import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import crypto from 'crypto';
import { UserSchema } from '@domain/schemas';
import { AddUserResponseViewModel } from '@presentation/view-models';
import { EnvironmentVariables, ErrorMessages } from '@domain/enum';
import { AuthService } from '@application/services';

export class AddUserCommand {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string
  ) {}
}

@CommandHandler(AddUserCommand)
export class AddUserHandler implements ICommandHandler<AddUserCommand> {
  constructor(
    @InjectRepository(UserSchema)
    private usersRepository: Repository<UserSchema>,
    private authService: AuthService
  ) {}

  async execute(command: AddUserCommand): Promise<AddUserResponseViewModel> {
    const userInDB = await this.usersRepository.findOne({ where: { email: command.email } });
    if (userInDB !== undefined) throw new Error(ErrorMessages.UserAlreadyExist);

    const salt = crypto.randomBytes(16).toString('hex');
    const hashedPassword = crypto
      .pbkdf2Sync(command.password, salt, 1000, 64, `sha512`)
      .toString(`hex`);

    const user = await this.usersRepository.save({
      email: command.email,
      name: command.name,
      salt,
      hashedPassword,
      refreshToken: ''
    });

    const accessToken = await this.authService.generateToken({ id: user.id, email: user.email });

    const refreshToken = await this.authService.generateToken(
      { id: user.id, email: user.email },
      { secret: process.env[EnvironmentVariables.JWT_REFRESH_TOKEN_SECRET] }
    );

    this.usersRepository.save({
      id: user.id,
      refreshToken
    });

    return new AddUserResponseViewModel({
      email: user.email,
      id: user.id,
      name: user.name,
      refreshToken: refreshToken,
      accessToken: accessToken
    });
  }
}
