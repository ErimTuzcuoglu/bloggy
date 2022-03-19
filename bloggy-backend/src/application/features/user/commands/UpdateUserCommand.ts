import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import crypto from 'crypto';
import { UserSchema } from '@domain/schemas';
import { ErrorMessages } from '@domain/enum';
import { UpdateUserResponseViewModel } from '@presentation/view-models';

type UpdateUserCommandParams = {
  id: string;
  name: string;
  email: string;
  password?: string;
};

export class UpdateUserCommand {
  constructor(public readonly userData: UpdateUserCommandParams) {}
}

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @InjectRepository(UserSchema)
    private usersRepository: Repository<UserSchema>
  ) {}

  async execute(command: UpdateUserCommand): Promise<any> {
    const { email: newEmail, id, name, password } = command.userData;
    const userInDB = await this.usersRepository.findOne(id);
    let updatedUser: Record<string, unknown> = { id, name: userInDB.name };

    if (userInDB.email !== newEmail) {
      const isEmailExists = await this.usersRepository.findOne({ where: { email: newEmail } });
      if (isEmailExists !== undefined) throw new Error(ErrorMessages.EmailAlreadyExists);

      updatedUser = { ...updatedUser, email: newEmail };
    }
    if (password) {
      // eslint-disable-next-line no-var
      var salt = crypto.randomBytes(16).toString('hex');
      // eslint-disable-next-line no-var
      var hashedPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
      updatedUser = { ...updatedUser, salt, hashedPassword };
    }

    if (!!name && userInDB.name !== name) updatedUser = { ...updatedUser, name };

    const user = await this.usersRepository.save(updatedUser);

    return new UpdateUserResponseViewModel({
      email: user.email,
      id: user.id,
      name: user.name
    });
  }
}
