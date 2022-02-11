import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSchema } from '@domain/schemas';

export class LogoutUserCommand {
  constructor(public readonly id: string) {}
}

@CommandHandler(LogoutUserCommand)
export class LogoutUserHandler implements ICommandHandler<LogoutUserCommand> {
  constructor(
    @InjectRepository(UserSchema)
    private usersRepository: Repository<UserSchema>
  ) {}

  async execute(command: LogoutUserCommand): Promise<unknown> {
    await this.usersRepository.save({
      id: command.id,
      refreshToken: ''
    });
    return {};
  }
}
