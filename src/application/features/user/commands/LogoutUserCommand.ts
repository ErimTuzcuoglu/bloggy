import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSchema } from '@domain/schemas';

export class LogoutUserCommand {}

@QueryHandler(LogoutUserCommand)
export class LogoutUserHandler implements IQueryHandler<LogoutUserCommand> {
  constructor(
    @InjectRepository(UserSchema)
    private usersRepository: Repository<UserSchema>
  ) {}

  async execute(): Promise<Array<UserSchema>> {
    return this.usersRepository.find({
      // where: { email: command.email }
    });
  }
}
