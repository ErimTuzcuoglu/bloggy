import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSchema } from '@domain/schemas';

export class RefreshTokenUserCommand {}

@QueryHandler(RefreshTokenUserCommand)
export class RefreshTokenUserHandler implements IQueryHandler<RefreshTokenUserCommand> {
  constructor(
    @InjectRepository(UserSchema)
    private usersRepository: Repository<UserSchema>
  ) {}

  async execute(): Promise<Array<UserSchema>> {
    return this.usersRepository.find();
  }
}
